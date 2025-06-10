import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: "./",
  publicDir: "src/public",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        dashboard: resolve(__dirname, "dashboard.html"),
        about: resolve(__dirname, "about-us.html"),
        blog: resolve(__dirname, "blog.html"),
        blogdetail: resolve(__dirname, "blog-detail.html"),
        contactus: resolve(__dirname, "contact-us.html"),
        lognewentry: resolve(__dirname, "log-new-entry.html"),
        result: resolve(__dirname, "prediction-result.html"),
        notfoundpage: resolve(__dirname, "not-found-page.html"),
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
