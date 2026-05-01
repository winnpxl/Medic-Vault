import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth, requireRole } from "./auth";
import { config } from "./config";
import { errorHandler, notFoundHandler } from "./errors";
import { findPatients, getPatientStats } from "./repositories/patient-repository";
import { applySecurityMiddleware } from "./security";
import { patientQuerySchema } from "./validation";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
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
      res.json(patients);
    } catch (error) {
      next(error);
    }
  });

  api.get("/stats", requireRole(["super_admin", "admin"]), (_req, res) => {
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

  app.listen(config.port, config.host, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

startServer();
