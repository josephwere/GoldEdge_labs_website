const express = require('express');
const router = express.Router();
const User = require('../../3_Database/models/User');
const Reward = require('../../3_Database/models/Reward');
const bcrypt = require('bcryptjs');

// Simple in-memory sessions (for demo). In production use JWT.
const adminSessions = {};

router.post('/login', async (req, res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({ error: 'Missing' });
  // admin credentials env fallback
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = 'adm_' + Math.random().toString(36).slice(2);
      adminSessions[token] = { email, createdAt: Date.now() };
      return res.json({ token });
    }
  }
  // or check users collection
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ error: 'Invalid' });
  const ok = await bcrypt.compare(password, user.password || '');
  if (!ok) return res.status(401).json({ error: 'Invalid' });
  const token = 'adm_' + Math.random().toString(36).slice(2);
  adminSessions[token] = { email, createdAt: Date.now() };
  res.json({ token });
});

// middleware
function ensureAuth(req, res, next) {
  const token = req.headers['x-admin-token'] || req.body.token;
  if (!token || !adminSessions[token]) return res.status(401).json({ error: 'Unauthorized' });
  next();
}

router.get('/users', ensureAuth, async (req, res) => {
  const users = await User.find().limit(100).select('-password');
  res.json({ users });
});

router.post('/rewards/grant', ensureAuth, async (req, res) => {
  const { userId, key, title } = req.body || {};
  if (!userId || !key) return res.status(400).json({ error: 'Missing' });
  const existing = await Reward.findOne({ userId, key });
  if (existing) return res.json({ granted:false, message:'Already exists' });
  const r = new Reward({ userId, key, title: title||key, unlockedAt: new Date() });
  await r.save();
  res.json({ granted:true, reward:r });
});

router.post('/rewards/revoke', ensureAuth, async (req, res) => {
  const { userId, key } = req.body || {};
  if (!userId || !key) return res.status(400).json({ error: 'Missing' });
  await Reward.deleteOne({ userId, key });
  res.json({ revoked:true });
});


export default router;