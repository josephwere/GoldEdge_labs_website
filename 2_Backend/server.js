const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const apiRoutes = require('./routes/api');
const mongoose = require('mongoose');
const path = require('path');
const Redis = require('ioredis');
const { exec } = require('child_process');

app.use(helmet());
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*'
}));
app.use(express.json({ limit: '1mb' }));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 60,
});
app.use(limiter);

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/goldedge';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Redis connection (optional)
let redisClient = null;
if (process.env.REDIS_URL) {
  redisClient = new Redis(process.env.REDIS_URL);
  redisClient.on('connect', ()=> console.log('Redis connected'));
  redisClient.on('error', (e)=> console.error('Redis error', e));
} else {
  console.warn('REDIS_URL not set — using in-memory fallback for convo storage.');
}

app.locals.redis = redisClient;

// Mount API routes
app.use('/api', apiRoutes);
app.use('/api/admin', require('./routes/admin'));

// Basic root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Try to seed admin if env present
if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
  console.log('Seeding admin user if missing...');
  try {
    exec('node seedAdmin.js', { cwd: __dirname }, (err, stdout, stderr) => {
      if (err) console.error('Seed admin error', err);
      if (stdout) console.log('Seed:', stdout);
      if (stderr) console.error('Seed err:', stderr);
    });
  } catch(e){ console.error('Seed spawn error', e); }
}

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
