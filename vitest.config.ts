import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "src/**/*.smoke.test.tsx"],
    setupFiles: ["./server/test/setup.ts"],
    globals: true,
    // Test files share one database when DATABASE_URL is set (CI), so run them one at a time.
    fileParallelism: false,
  },
});
