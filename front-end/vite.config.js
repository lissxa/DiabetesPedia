// import { defineConfig } from "vite";
// import { resolve } from "path";

// export default defineConfig({
//   root: "./",
//   build: {
//     outDir: "../dist",
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, "./index.html"),
//         login: resolve(__dirname, "./index.html"),
//         register: resolve(__dirname, "./index.html"),
//         dashboard: resolve(__dirname, "./dashboard.html"),
//       },
//     },
//   },
//   server: {
//     port: 5173,
//     open: true,
//   },
// });
import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
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
