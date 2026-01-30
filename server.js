import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const distPath = path.join(__dirname, "dist");

// index.html must NEVER be cached
app.use((req, res, next) => {
  if (req.path === "/" || req.path.endsWith("index.html")) {
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
  }
  next();
});

// hashed assets can be cached
app.use(express.static(distPath, {
  maxAge: "1y",
  immutable: true,
  index: false
}));

// SPA fallback
app.get("/*", (_, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(process.env.PORT || 3000);
