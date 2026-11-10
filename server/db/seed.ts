import fs from "fs";
import path from "path";
import { sql } from "drizzle-orm";
import { config } from "../config";
import { db } from "./client";
import { auditLogs, patients, type PatientRecord } from "./schema";

function readDemoPatients(): PatientRecord[] {
  const jsonPath = path.join(config.appBaseDir, "src", "patients.json");
  if (!fs.existsSync(jsonPath)) {
    return [];
  }
  return JSON.parse(fs.readFileSync(jsonPath, "utf-8")) as PatientRecord[];
}

/** Loads the demo patients from src/patients.json when the table is empty. Returns rows inserted. */
export async function seedDemoPatientsIfEmpty(): Promise<number> {
  if ((await db.$count(patients)) > 0) {
    return 0;
  }
  const rows = readDemoPatients();
  if (rows.length === 0) {
    return 0;
  }
  await db.insert(patients).values(rows).onConflictDoNothing();
  return rows.length;
}

export async function resetDatabaseForTests(): Promise<void> {
  if (!config.isTest) {
    throw new Error("resetDatabaseForTests() may only run with NODE_ENV=test");
  }
  await db.execute(sql`TRUNCATE TABLE ${auditLogs}, ${patients} RESTART IDENTITY`);
  await seedDemoPatientsIfEmpty();
}
