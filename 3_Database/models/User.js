const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  points: { type: Number, default: 0 },
  badges: [{ key: String, title: String, unlockedAt: Date }],
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
