import { defineConfig } from "drizzle-kit";

// `npm run db:generate` turns schema changes into SQL migrations in ./drizzle.
// Migrations run automatically when the server starts (server/index.ts).
export default defineConfig({
  dialect: "postgresql",
  schema: "./server/db/schema.ts",
  out: "./drizzle",
  strict: true,
});
