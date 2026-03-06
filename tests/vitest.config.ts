/**
 * Vitest configuration for Perioskoup unit tests
 *
 * Run: pnpm vitest --config tests/vitest.config.ts
 *
 * Required installs (add to devDependencies):
 *   pnpm add -D vitest @vitejs/plugin-react @testing-library/react @testing-library/user-event @testing-library/jest-dom jsdom
 */
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./unit/setup.ts"],
    include: ["./unit/**/*.test.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      include: [
        "../client/src/components/**",
        "../client/src/pages/**",
      ],
      exclude: [
        "../client/src/components/ui/**",
        "../client/src/**/*.d.ts",
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        branches: 50,
        statements: 60,
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../client/src"),
    },
  },
});
