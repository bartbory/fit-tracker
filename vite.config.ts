import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      includeAssets: [],
      manifest: {
        name: "Fit tracker",
        short_name: "FIT",
        description: "Track how your body changes",
        theme_color: "#ffffff",
        icons: [],
      },
    }),
  ],
});
