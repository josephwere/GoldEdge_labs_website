// db.js - PostgreSQL connection (for ES modules)
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Required for Render PostgreSQL
});

pool.on("connect", () => {
  console.log("✅ PostgreSQL connected successfully");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL connection error:", err);
});

export default pool;