import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        home: resolve(__dirname, "index.html"),
        dashboard: resolve(__dirname, "dashboard.html"),
        about: resolve(__dirname, "about-us.html"),
        blog: resolve(__dirname, "blog.html"),
        lognewentry: resolve(__dirname, "log-new-entry.html"),
      },
    },
  },
  server: {
    port: 3001,
    open: true,
    cors: true,
  },
  preview: {
    port: 3002,
  },
});
