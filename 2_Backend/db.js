// 2_Backend/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// ✅ PostgreSQL connection string (Render or local)
const connectionString =
  process.env.DATABASE_URL ||
  "postgresql://goldedge_labs_2kex_user:JMLgca7r95VI9Rt70ZZgR4NpdIZYb1Iq@dpg-d3p577jipnbc739nprr0-a/goldedge_labs_2kex";

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false, // Required for Render PostgreSQL SSL
  },
});

// Optional: quick test log
pool
  .connect()
  .then((client) => {
    console.log("✅ Connected to PostgreSQL database");
    client.release();
  })
  .catch((err) => console.error("❌ PostgreSQL connection error:", err.message));

export default pool;