import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth, requireRole } from "./auth";
import { config } from "./config";
import { errorHandler, notFoundHandler } from "./errors";
import { logAuditEvent } from "./repositories/audit-repository";
import { findPatients, getPatientStats } from "./repositories/patient-repository";
import { applySecurityMiddleware } from "./security";
import { patientQuerySchema } from "./validation";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getClientIp(forwardedFor: string | undefined, fallbackIp: string | undefined): string | undefined {
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim();
  }
  return fallbackIp;
}

export async function createApp() {
  const app = express();
  applySecurityMiddleware(app);
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      env: config.nodeEnv,
    });
  });

  const api = express.Router();
  api.use(requireAuth);

  api.get("/patients", (req, res, next) => {
    try {
      const query = patientQuerySchema.parse(req.query);
      const patients = findPatients(query);
      if (req.user) {
        logAuditEvent({
          actorUid: req.user.uid,
          actorEmail: req.user.email,
          actorRole: req.user.role,
          action: "patients.list",
          resourceType: "patient",
          metadata: query,
          ipAddress: getClientIp(req.header("x-forwarded-for"), req.ip),
          userAgent: req.header("user-agent"),
        });
      }
      res.json(patients);
    } catch (error) {
      next(error);
    }
  });

  api.get("/stats", requireRole(["super_admin", "admin"]), (req, res) => {
    if (req.user) {
      logAuditEvent({
        actorUid: req.user.uid,
        actorEmail: req.user.email,
        actorRole: req.user.role,
        action: "stats.read",
        resourceType: "dashboard_stats",
        ipAddress: getClientIp(req.header("x-forwarded-for"), req.ip),
        userAgent: req.header("user-agent"),
      });
    }
    res.json(getPatientStats());
  });
  app.use("/api", api);

  // Vite middleware for development
  if (!config.isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(config.appBaseDir, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

async function startServer() {
  const app = await createApp();
  app.listen(config.port, config.host, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

if (!config.isTest) {
  startServer();
}
