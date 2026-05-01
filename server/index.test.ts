import request from "supertest";
import { beforeEach, describe, expect, it } from "vitest";
import { db, resetDatabaseForTests } from "./database";
import { createApp } from "./index";

describe("api integration", () => {
  beforeEach(() => {
    resetDatabaseForTests();
  });

  it("rejects unauthenticated access", async () => {
    const app = await createApp();
    const response = await request(app).get("/api/patients");
    expect(response.status).toBe(401);
  });

  it("allows staff to read patients and writes audit log", async () => {
    const app = await createApp();
    const response = await request(app)
      .get("/api/patients?status=Admitted")
      .set("x-test-uid", "test-staff-1")
      .set("x-test-role", "staff")
      .set("x-test-email", "staff@example.com");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);

    const logCount = (
      db.prepare("SELECT COUNT(*) AS count FROM audit_logs WHERE actor_uid = ? AND action = ?")
        .get("test-staff-1", "patients.list") as { count: number }
    ).count;
    expect(logCount).toBe(1);
  });

  it("enforces admin role on stats route", async () => {
    const app = await createApp();

    const forbidden = await request(app)
      .get("/api/stats")
      .set("x-test-uid", "test-staff-2")
      .set("x-test-role", "staff");
    expect(forbidden.status).toBe(403);

    const allowed = await request(app)
      .get("/api/stats")
      .set("x-test-uid", "test-admin-1")
      .set("x-test-role", "admin");
    expect(allowed.status).toBe(200);
    expect(typeof allowed.body.recentlyAccessed).toBe("number");
  });
});
