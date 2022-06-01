/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/utils/setup.ts",
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, "./src/components"),
      generated: path.resolve(__dirname, "./src/generated.ts"),
      fixtures: path.resolve(__dirname, "./src/fixtures"),
      hooks: path.resolve(__dirname, "./src/hooks"),
      pages: path.resolve(__dirname, "./src/pages"),
      utils: path.resolve(__dirname, "./src/utils"),
    },
  },
});
