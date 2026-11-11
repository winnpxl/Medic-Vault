import path from "path";
import { sql } from "drizzle-orm";
import type { PgDatabase, PgQueryResultHKT } from "drizzle-orm/pg-core";
import { config } from "../config";
import * as schema from "./schema";

export type Db = PgDatabase<PgQueryResultHKT, typeof schema>;

type Connection = {
  db: Db;
  driver: "postgres" | "pglite";
  migrate: (migrationsFolder: string) => Promise<void>;
  close: () => Promise<void>;
};

// DATABASE_URL → real Postgres (production, CI). Without it, dev and tests use
// PGlite: Postgres compiled to WASM, running in-process, so no local install is
// needed. Drivers are imported lazily so production never loads PGlite.
async function connect(): Promise<Connection> {
  const url = process.env.DATABASE_URL;

  if (url) {
    const { Pool } = await import("pg");
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const { migrate } = await import("drizzle-orm/node-postgres/migrator");
    const pool = new Pool({ connectionString: url, max: Number.parseInt(process.env.DATABASE_POOL_MAX ?? "10", 10) });
    const db = drizzle(pool, { schema });
    return {
      db: db as unknown as Db,
      driver: "postgres",
      migrate: (migrationsFolder) => migrate(db, { migrationsFolder }),
      close: () => pool.end(),
    };
  }

  if (config.isProduction) {
    throw new Error("DATABASE_URL is required in production");
  }

  const { PGlite } = await import("@electric-sql/pglite");
  const { drizzle } = await import("drizzle-orm/pglite");
  const { migrate } = await import("drizzle-orm/pglite/migrator");
  // Tests: in-memory. Dev: persisted under data/pglite (gitignored).
  const dataDir = config.isTest ? undefined : (process.env.PGLITE_DIR ?? path.join(config.appBaseDir, "data", "pglite"));
  const client = new PGlite(dataDir);
  const db = drizzle(client, { schema });
  return {
    db: db as unknown as Db,
    driver: "pglite",
    migrate: (migrationsFolder) => migrate(db, { migrationsFolder }),
    close: () => client.close(),
  };
}

const connection = await connect();

export const db = connection.db;
export const dbDriver = connection.driver;
export const closeDatabase = connection.close;

export async function runMigrations(): Promise<void> {
  await connection.migrate(path.join(config.appBaseDir, "drizzle"));
}

export async function checkDatabaseReadiness(): Promise<boolean> {
  try {
    await db.execute(sql`select 1`);
    return true;
  } catch (_error) {
    return false;
  }
}
