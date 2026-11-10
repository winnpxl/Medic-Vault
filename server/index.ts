import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth, requireRole } from "./auth";
import { config } from "./config";
import { checkDatabaseReadiness, dbDriver, runMigrations } from "./db/client";
import { seedDemoPatientsIfEmpty } from "./db/seed";
import { errorHandler, notFoundHandler } from "./errors";
import { applyObservabilityMiddleware, initializeMonitoring } from "./observability";
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
  // Number of reverse proxies in front of the app (e.g. Vercel rewrite + Railway edge = 2),
  // so req.ip / rate limiting use the real client IP instead of the proxy's.
  app.set("trust proxy", config.trustProxyHops);
  initializeMonitoring();
  applyObservabilityMiddleware(app);
  applySecurityMiddleware(app);
  app.get("/health", (_req, res) => {
    res.status(200).json({
      status: "ok",
      env: config.nodeEnv,
    });
  });
  app.get("/ready", async (_req, res) => {
    const dbReady = await checkDatabaseReadiness();
    if (!dbReady) {
      res.status(503).json({
        status: "not_ready",
        dependencies: {
          database: "down",
        },
      });
      return;
    }

    res.status(200).json({
      status: "ready",
      dependencies: {
        database: "up",
      },
    });
  });

  const api = express.Router();
  api.use(requireAuth);

  api.get("/patients", async (req, res, next) => {
    try {
      const query = patientQuerySchema.parse(req.query);
      const patients = await findPatients(query);
      if (req.user) {
        await logAuditEvent({
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

  api.get("/stats", requireRole(["super_admin", "admin"]), async (req, res, next) => {
    try {
      if (req.user) {
        await logAuditEvent({
          actorUid: req.user.uid,
          actorEmail: req.user.email,
          actorRole: req.user.role,
          action: "stats.read",
          resourceType: "dashboard_stats",
          ipAddress: getClientIp(req.header("x-forwarded-for"), req.ip),
          userAgent: req.header("user-agent"),
        });
      }
      res.json(await getPatientStats());
    } catch (error) {
      next(error);
    }
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
  // Single replica for now, so migrating on boot is safe. With several replicas,
  // move this to a Railway pre-deploy command (`npm run db:migrate`).
  await runMigrations();
  if (process.env.SEED_DEMO_DATA !== "false") {
    const seeded = await seedDemoPatientsIfEmpty();
    if (seeded > 0) console.log(`Seeded ${seeded} demo patients`);
  }
  console.log(`Database ready (${dbDriver})`);
  const app = await createApp();
  app.listen(config.port, config.host, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

if (!config.isTest) {
  startServer().catch((error) => {
    console.error("Failed to start server", error);
    process.exit(1);
  });
}
