import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import path from "path";
import Redis from "ioredis";
import { exec } from "child_process";
import dotenv from "dotenv";
import pool from "./db.js"; // ✅ new PostgreSQL connection
import apiRoutes from "./routes/api.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();

// --- Security & Middleware ---
app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || "*",
}));
app.use(express.json({ limit: "1mb" }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});
app.use(limiter);

// --- PostgreSQL Connection Test ---
pool.connect()
  .then(() => console.log("✅ PostgreSQL connected"))
  .catch((err) => console.error("❌ PostgreSQL connection error:", err));

// --- Redis Connection (optional) ---
let redisClient = null;
if (process.env.REDIS_URL) {
  redisClient = new Redis(process.env.REDIS_URL);
  redisClient.on("connect", () => console.log("Redis connected"));
  redisClient.on("error", (e) => console.error("Redis error:", e));
} else {
  console.warn("REDIS_URL not set — using in-memory fallback.");
}
app.locals.redis = redisClient;

// --- Mount Routes ---
app.use("/api", apiRoutes);
app.use("/api/admin", adminRoutes);

// --- Root Route ---
app.get("/", (req, res) => {
  res.sendFile(path.join(path.resolve(), "views", "index.html"));
});

// --- Seed Admin ---
if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
  console.log("🪄 Seeding admin user if missing...");
  try {
    exec("node seedAdmin.js", { cwd: path.resolve() }, (err, stdout, stderr) => {
      if (err) console.error("Seed admin error", err);
      if (stdout) console.log("Seed:", stdout);
      if (stderr) console.error("Seed err:", stderr);
    });
  } catch (e) {
    console.error("Seed spawn error", e);
  }
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));