// db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.MONGO_URI || process.env.POSTGRES_URI
});

// Test connection
pool.connect()
  .then(() => console.log("✅ PostgreSQL connected successfully"))
  .catch(err => console.error("❌ PostgreSQL connection error:", err));

export default pool;