const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: { type: String, default: 'Joseph Ogwe Were' },
  age: { type: Number, default: 20 },
  dob: { type: String, default: '15.04.2004' },
  gender: { type: String, default: 'male' },
  nationality: { type: String, default: 'Kenyan' },
  occupation: { type: String, default: 'Full-scale Software Developer' },
  contact: { type: String, default: '+254712462780' },
  email: { type: String, default: 'werejosephogwe@gmail.com' },
  bio: { type: String, default: 'Founder of GoldEdge Labs, creating future-proof AI-powered solutions.' },
  image: { type: String, default: '/uploads/profile_images/default.png' }
});

module.exports = mongoose.model('Profile', ProfileSchema);
