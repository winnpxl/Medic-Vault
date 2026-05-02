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
const dbPath = process.env.SQLITE_PATH ?? path.join(dataDir, "medic-vault.db");

if (dbPath !== ":memory:" && !fs.existsSync(dataDir)) {
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

    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      actor_uid TEXT NOT NULL,
      actor_email TEXT,
      actor_role TEXT NOT NULL,
      action TEXT NOT NULL,
      resource_type TEXT NOT NULL,
      resource_id TEXT,
      metadata_json TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_audit_actor_uid ON audit_logs(actor_uid);
    CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
    CREATE INDEX IF NOT EXISTS idx_audit_created_at ON audit_logs(created_at);
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

export function resetDatabaseForTests(): void {
  db.exec(`
    DELETE FROM audit_logs;
    DELETE FROM patients;
  `);
  seedPatientsIfEmpty();
}
