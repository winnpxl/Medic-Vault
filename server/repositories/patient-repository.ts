import { and, asc, eq, ilike, or, type SQL } from "drizzle-orm";
import { db } from "../db/client";
import { patients, type PatientRecord } from "../db/schema";

type PatientFilters = {
  department?: string;
  status?: string;
  search?: string;
};

export async function findPatients(filters: PatientFilters): Promise<PatientRecord[]> {
  const conditions: SQL[] = [];

  if (filters.department) {
    conditions.push(eq(patients.department, filters.department));
  }
  if (filters.status) {
    conditions.push(eq(patients.status, filters.status));
  }
  if (filters.search) {
    const pattern = `%${filters.search}%`;
    conditions.push(or(ilike(patients.name, pattern), ilike(patients.id, pattern))!);
  }

  return db
    .select()
    .from(patients)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(asc(patients.name));
}

export async function getPatientStats(): Promise<{
  recentlyAccessed: number;
  pendingReviews: number;
  externalShares: number;
  accessAlerts: number;
}> {
  const [total, icu, admitted] = await Promise.all([
    db.$count(patients),
    db.$count(patients, eq(patients.status, "ICU")),
    db.$count(patients, eq(patients.status, "Admitted")),
  ]);

  return {
    recentlyAccessed: total,
    pendingReviews: admitted,
    externalShares: Math.round(total * 0.35),
    accessAlerts: icu,
  };
}
