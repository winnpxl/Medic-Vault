import { beforeEach, describe, expect, it } from "vitest";
import { resetDatabaseForTests } from "../db/seed";
import { findPatients, getPatientStats } from "./patient-repository";

describe("patient repository", () => {
  beforeEach(async () => {
    await resetDatabaseForTests();
  });

  it("returns seeded patients", async () => {
    const patients = await findPatients({});
    expect(patients.length).toBeGreaterThan(0);
  });

  it("filters by status and search", async () => {
    const admitted = await findPatients({ status: "Admitted" });
    expect(admitted.length).toBeGreaterThan(0);
    expect(admitted.every((p) => p.status === "Admitted")).toBe(true);

    const searched = await findPatients({ search: "PT000001" });
    expect(searched.length).toBe(1);
    expect(searched[0]?.id).toBe("PT000001");
  });

  it("computes stats from persisted data", async () => {
    const stats = await getPatientStats();
    expect(stats.recentlyAccessed).toBeGreaterThan(0);
    expect(stats.pendingReviews).toBeGreaterThanOrEqual(0);
    expect(stats.accessAlerts).toBeGreaterThanOrEqual(0);
  });
});
