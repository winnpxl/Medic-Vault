import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

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
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
