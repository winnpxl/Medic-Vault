import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { config } from "./config";

export type PatientRecord = {
  id: string;
  name: string;
  age: number;
  status: string;
  files: number;
  department: string;
  lastUpdated: string;
};

const dataDir = path.join(config.appBaseDir, "data");
const dbPath = path.join(dataDir, "medic-vault.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

export const db = new Database(dbPath);

function migrate(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS patients (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      age INTEGER NOT NULL,
      status TEXT NOT NULL,
      files INTEGER NOT NULL DEFAULT 0,
      department TEXT NOT NULL,
      last_updated TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_patients_department ON patients(department);
    CREATE INDEX IF NOT EXISTS idx_patients_status ON patients(status);
    CREATE INDEX IF NOT EXISTS idx_patients_name ON patients(name);
  `);
}

function seedPatientsIfEmpty(): void {
  const countRow = db.prepare("SELECT COUNT(*) AS count FROM patients").get() as { count: number };
  if (countRow.count > 0) {
    return;
  }

  const jsonPath = path.join(config.appBaseDir, "src", "patients.json");
  if (!fs.existsSync(jsonPath)) {
    return;
  }

  const raw = fs.readFileSync(jsonPath, "utf-8");
  const rows = JSON.parse(raw) as PatientRecord[];
  const insert = db.prepare(`
    INSERT INTO patients (id, name, age, status, files, department, last_updated)
    VALUES (@id, @name, @age, @status, @files, @department, @lastUpdated)
  `);

  const transaction = db.transaction((patients: PatientRecord[]) => {
    for (const patient of patients) {
      insert.run(patient);
    }
  });

  transaction(rows);
}

migrate();
seedPatientsIfEmpty();
