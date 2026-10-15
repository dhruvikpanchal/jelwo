import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

// Middleware to properly serve HTTP 206 Partial Content Range requests for video files in dev and preview servers
function videoRangePlugin() {
  const handler = (req, res, next) => {
    const rawUrl = req.url ? req.url.split("?")[0] : "";
    if (rawUrl.endsWith(".mp4") || rawUrl.endsWith(".webm") || rawUrl.endsWith(".ogg")) {
      const publicPath = path.join(process.cwd(), "public", rawUrl.replace(/^\//, ""));
      const distPath = path.join(process.cwd(), "dist", rawUrl.replace(/^\//, ""));
      const filePath = fs.existsSync(publicPath) ? publicPath : fs.existsSync(distPath) ? distPath : null;

      if (filePath) {
        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;

        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");

        if (range) {
          const parts = range.replace(/bytes=/, "").split("-");
          const start = parseInt(parts[0], 10);
          const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

          if (start >= fileSize || end >= fileSize || start > end) {
            res.writeHead(416, {
              "Content-Range": `bytes */${fileSize}`,
            });
            return res.end();
          }

          const chunkSize = end - start + 1;
          res.writeHead(206, {
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": chunkSize,
            "Content-Type": "video/mp4",
          });

          const fileStream = fs.createReadStream(filePath, { start, end });
          fileStream.on("error", () => res.end());
          fileStream.pipe(res);
          return;
        } else {
          res.writeHead(200, {
            "Content-Length": fileSize,
            "Content-Type": "video/mp4",
            "Accept-Ranges": "bytes",
          });
          const fileStream = fs.createReadStream(filePath);
          fileStream.on("error", () => res.end());
          fileStream.pipe(res);
          return;
        }
      }
    }
    next();
  };

  return {
    name: "video-range-server",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  plugins: [react(), tailwindcss(), videoRangePlugin()],
  server: {
    headers: {
      "Accept-Ranges": "bytes",
    },
  },
  preview: {
    headers: {
      "Accept-Ranges": "bytes",
    },
  },
  build: {
    target: "es2022",
    cssCodeSplit: true,
    assetsInlineLimit: 4096,
    chunkSizeWarningLimit: 600,
    modulePreload: { polyfill: false },
    reportCompressedSize: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const normalized = id.replace(/\\/g, "/");
          if (normalized.includes("/node_modules/")) {
            if (normalized.includes("/lucide-react/")) {
              return "vendor-icons";
            }
            if (normalized.includes("/motion/") || normalized.includes("/framer-motion/")) {
              return "vendor-motion";
            }
            if (normalized.includes("/swiper/")) {
              return "vendor-swiper";
            }
            if (
              normalized.includes("/react/") ||
              normalized.includes("/react-dom/") ||
              normalized.includes("/scheduler/")
            ) {
              return "vendor-react";
            }
          }
        },
      },
    },
  },
});

