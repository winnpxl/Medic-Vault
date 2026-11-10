// Usage: tsx server/db/cli.ts migrate | seed
// Uses DATABASE_URL if set, otherwise the local PGlite database in data/pglite.
import { closeDatabase, dbDriver, runMigrations } from "./client";
import { seedDemoPatientsIfEmpty } from "./seed";

const command = process.argv[2];

try {
  if (command === "migrate") {
    await runMigrations();
    console.log(`Migrations applied (${dbDriver}).`);
  } else if (command === "seed") {
    await runMigrations();
    const inserted = await seedDemoPatientsIfEmpty();
    console.log(inserted > 0 ? `Seeded ${inserted} demo patients (${dbDriver}).` : "Patients table not empty; nothing seeded.");
  } else {
    console.error("Usage: tsx server/db/cli.ts migrate | seed");
    process.exitCode = 1;
  }
} finally {
  await closeDatabase();
}
