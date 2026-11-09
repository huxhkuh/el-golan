import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Relative URLs work both at a domain root and at /el-golan/ on GitHub Pages.
  base: "./",
  build: {
    outDir: "dist/client",
    rollupOptions: { input: "app.html" },
  },
  optimizeDeps: { include: ["react", "react-dom/client"] },
  server: {
    host: "0.0.0.0",
    allowedHosts: ["terminal.local"],
    warmup: { clientFiles: ["./src/main.jsx"] },
  },
  plugins: [
    react(),
    {
      name: "development-html-entry",
      // index.html is the published build; app.html is the editable source.
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url === "/" || req.url === "/index.html" || req.url?.startsWith("/?")) {
            req.url = "/app.html" + (req.url.includes("?") ? req.url.slice(req.url.indexOf("?")) : "");
          }
          next();
        });
      },
    },
  ],
});
