import { beforeAll } from "vitest";

process.env.NODE_ENV = "test";
process.env.CORS_ALLOWED_ORIGINS = "http://localhost:3000";
// DATABASE_URL set (CI) → tests run against real Postgres; otherwise in-memory PGlite.

beforeAll(async () => {
  // Imported after the env above is set, so the client picks the right driver.
  const { runMigrations } = await import("../db/client");
  await runMigrations();
});
