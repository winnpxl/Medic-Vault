import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { requireAuth, requireRole } from "./auth";
import { config } from "./config";
import { errorHandler, notFoundHandler } from "./errors";
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

  // Mock API for Patients
  const patientsPath = path.join(__dirname, "..", "src", "patients.json");
  let patients = [];
  try {
    const fs = await import("fs/promises");
    const data = await fs.readFile(patientsPath, "utf-8");
    patients = JSON.parse(data);
  } catch (error) {
    console.error("Error reading patients.json:", error);
    // Fallback or empty list
  }

  const api = express.Router();
  api.use(requireAuth);

  api.get("/patients", (req, res, next) => {
    try {
      const query = patientQuerySchema.parse(req.query);
      const filtered = patients.filter((patient: Record<string, unknown>) => {
        if (query.department && patient.department !== query.department) return false;
        if (query.status && patient.status !== query.status) return false;
        if (query.search) {
          const haystack = `${String(patient.name ?? "")} ${String(patient.id ?? "")}`.toLowerCase();
          return haystack.includes(query.search.toLowerCase());
        }
        return true;
      });
      res.json(filtered);
    } catch (error) {
      next(error);
    }
  });

  api.get("/stats", requireRole(["super_admin", "admin"]), (_req, res) => {
    res.json({
      recentlyAccessed: 89,
      pendingReviews: 45,
      externalShares: 231,
      accessAlerts: 452,
    });
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
