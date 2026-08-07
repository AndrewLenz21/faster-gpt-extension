// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@core": "/src/core",
        "@modules": "/src/modules",
        "@shared": "/src/shared",
        "@styles": "/src/styles",
      },
    },
  },
});
