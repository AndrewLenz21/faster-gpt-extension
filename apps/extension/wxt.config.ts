import { defineConfig } from "wxt";
import tailwindcss from "@tailwindcss/vite";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  modulesDir: "wxt-modules",
  vite: () => ({
    plugins: [tailwindcss()],
  }),
  manifest: {
    name: "FasterGPT",
    action: {
      default_title: "FasterGPT",
    },
    options_ui: {
      open_in_tab: true,
      page: "options.html",
    },
    permissions: ["activeTab", "processes", "scripting", "system.memory"],
  },
  webExt: {
    binaries: {
      chrome: "C:\\Program Files\\Application\\vivaldi.exe",
    },
    chromiumProfile:
      "C:\\Users\\angel\\AppData\\Local\\Vivaldi\\Test Extension",
  },
});
