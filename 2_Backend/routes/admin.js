// 2_Backend/routes/admin.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// --- In-memory mock admin check (replace with DB later) ---
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// --- Admin Login ---
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (email !== ADMIN_EMAIL) {
      return res.status(401).json({ error: "Invalid email" });
    }

    // 🔐 bcrypt compare
    const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET || "goldedge_secret", {
      expiresIn: "2h",
    });

    res.json({ success: true, token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// --- Admin Dashboard Test ---
router.get("/status", (req, res) => {
  res.json({
    admin: ADMIN_EMAIL,
    status: "✅ Admin route is active",
    time: new Date(),
  });
});

export default router;