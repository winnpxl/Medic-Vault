import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["server/**/*.test.ts", "src/**/*.smoke.test.tsx"],
    setupFiles: ["./server/test/setup.ts"],
    globals: true,
  },
});
