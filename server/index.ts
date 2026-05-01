import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { config } from "./config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();

  app.use(express.json());
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

  app.get("/api/patients", (req, res) => {
    res.json(patients);
  });

  app.get("/api/stats", (req, res) => {
    res.json({
      recentlyAccessed: 89,
      pendingReviews: 45,
      externalShares: 231,
      accessAlerts: 452,
    });
  });

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
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(config.port, config.host, () => {
    console.log(`Server running on http://localhost:${config.port}`);
  });
}

startServer();
