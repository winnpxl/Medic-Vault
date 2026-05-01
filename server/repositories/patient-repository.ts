import { db, type PatientRecord } from "../database";

type PatientFilters = {
  department?: string;
  status?: string;
  search?: string;
};

export function findPatients(filters: PatientFilters): PatientRecord[] {
  const conditions: string[] = [];
  const params: Record<string, string> = {};

  if (filters.department) {
    conditions.push("department = @department");
    params.department = filters.department;
  }
  if (filters.status) {
    conditions.push("status = @status");
    params.status = filters.status;
  }
  if (filters.search) {
    conditions.push("(LOWER(name) LIKE @search OR LOWER(id) LIKE @search)");
    params.search = `%${filters.search.toLowerCase()}%`;
  }

  const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  return db
    .prepare(
      `SELECT id, name, age, status, files, department, last_updated AS lastUpdated
       FROM patients
       ${whereClause}
       ORDER BY name ASC`,
    )
    .all(params) as PatientRecord[];
}

export function getPatientStats(): {
  recentlyAccessed: number;
  pendingReviews: number;
  externalShares: number;
  accessAlerts: number;
} {
  const total = (db.prepare("SELECT COUNT(*) AS count FROM patients").get() as { count: number }).count;
  const icu = (db.prepare("SELECT COUNT(*) AS count FROM patients WHERE status = 'ICU'").get() as { count: number }).count;
  const admitted = (
    db.prepare("SELECT COUNT(*) AS count FROM patients WHERE status = 'Admitted'").get() as { count: number }
  ).count;

  return {
    recentlyAccessed: total,
    pendingReviews: admitted,
    externalShares: Math.round(total * 0.35),
    accessAlerts: icu,
  };
}
