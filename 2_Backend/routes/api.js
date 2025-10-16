const adminRoutes = require('./admin');
const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const mongoose = require('mongoose');
// require reward controller inline for simplicity
const Reward = require('../../3_Database/models/Reward');
const User = require('../../3_Database/models/User');

router.get('/test', (req, res) => res.json({ message: 'API is working' }));
router.get('/health', (req, res) => res.json({ status: 'ok', uptime: process.uptime(), timestamp: Date.now() }));
router.post('/ai/chat', aiController.handleAIChat);

// Rewards endpoints
router.get('/rewards/:userId', async (req, res) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: 'Missing userId' });
  try {
    const rewards = await Reward.find({ userId });
    res.json({ rewards });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/rewards/unlock', async (req, res) => {
  const { userId, key, title, type='badge', meta } = req.body || {};
  if (!userId || !key || !title) return res.status(400).json({ error: 'Missing fields' });
  try {
    const existing = await Reward.findOne({ userId, key });
    if (existing) return res.json({ unlocked: false, message: 'Already unlocked' });
    const r = new Reward({ userId, key, title, type, meta, unlockedAt: new Date() });
    await r.save();
    // Optionally update user points
    if (type === 'points' && meta && meta.points) {
      await User.findByIdAndUpdate(userId, { $inc: { points: meta.points } });
    }
    res.json({ unlocked: true, reward: r });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

// Admin routes
const adminRouter = require('./admin');
// mount at /api/admin
