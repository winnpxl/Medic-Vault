import { beforeEach, describe, expect, it } from "vitest";
import { resetDatabaseForTests } from "../database";
import { findPatients, getPatientStats } from "./patient-repository";

describe("patient repository", () => {
  beforeEach(() => {
    resetDatabaseForTests();
  });

  it("returns seeded patients", () => {
    const patients = findPatients({});
    expect(patients.length).toBeGreaterThan(0);
  });

  it("filters by status and search", () => {
    const admitted = findPatients({ status: "Admitted" });
    expect(admitted.length).toBeGreaterThan(0);
    expect(admitted.every((p) => p.status === "Admitted")).toBe(true);

    const searched = findPatients({ search: "PT000001" });
    expect(searched.length).toBe(1);
    expect(searched[0]?.id).toBe("PT000001");
  });

  it("computes stats from persisted data", () => {
    const stats = getPatientStats();
    expect(stats.recentlyAccessed).toBeGreaterThan(0);
    expect(stats.pendingReviews).toBeGreaterThanOrEqual(0);
    expect(stats.accessAlerts).toBeGreaterThanOrEqual(0);
  });
});
