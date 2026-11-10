import request from "supertest";
import { and, eq } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";
import { db } from "./db/client";
import { auditLogs } from "./db/schema";
import { resetDatabaseForTests } from "./db/seed";
import { createApp } from "./index";

describe("api integration", () => {
  beforeEach(async () => {
    await resetDatabaseForTests();
  });

  it("rejects unauthenticated access", async () => {
    const app = await createApp();
    const response = await request(app).get("/api/patients");
    expect(response.status).toBe(401);
    expect(response.headers["x-request-id"]).toBeDefined();
  });

  it("returns readiness status when dependencies are healthy", async () => {
    const app = await createApp();
    const response = await request(app).get("/ready");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ready");
    expect(response.body.dependencies.database).toBe("up");
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

    const logCount = await db.$count(
      auditLogs,
      and(eq(auditLogs.actorUid, "test-staff-1"), eq(auditLogs.action, "patients.list")),
    );
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
