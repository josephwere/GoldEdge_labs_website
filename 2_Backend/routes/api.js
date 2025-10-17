// 2_Backend/routes/api.js
import express from "express";
const router = express.Router();

// --- Sample Public Endpoint ---
router.get("/test", (req, res) => {
  res.json({
    message: "✅ GoldEdge Labs API is running successfully",
    status: "active",
    time: new Date(),
  });
});

// --- Example Auth Check Endpoint ---
router.post("/echo", (req, res) => {
  res.json({
    success: true,
    received: req.body,
  });
});

export default router;
