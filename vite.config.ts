import { defineConfig } from "vite";
import type { UserConfig as VitestUserConfig } from "vitest/config";

import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";

declare module "vite" {
  export interface UserConfig {
    test: VitestUserConfig["test"];
  }
}

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/app/testsUtils.tsx",
    css: true
  },
  define: {
    global: {},
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
