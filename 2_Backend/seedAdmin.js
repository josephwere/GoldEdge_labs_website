const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./../models/User');

const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/goldedge';

async function run() {
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to Mongo for seeding admin...');
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if(!email || !password) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set; skipping admin seed.');
    process.exit(0);
  }
  const existing = await User.findOne({ email });
  if (existing) {
    console.log('Admin user already exists.');
    process.exit(0);
  }
  const hash = await bcrypt.hash(password, 10);
  const admin = new User({ name: 'Admin', email, password: hash, points:0, badges:[] });
  await admin.save();
  console.log('Admin user created:', email);
  process.exit(0);
}

run().catch(err=>{ console.error(err); process.exit(1); });
