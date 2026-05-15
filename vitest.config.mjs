import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      include: ["src/data/**/*.ts", "src/lib/**/*.ts"],
      reporter: ["text", "json-summary"],
    },
  },
});
