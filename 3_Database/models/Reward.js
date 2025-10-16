const mongoose = require('mongoose');
const RewardSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  key: { type: String, required: true, index: true },
  title: { type: String, required: true },
  type: { type: String, enum: ['badge','points','title'], default: 'badge' },
  meta: { type: Object, default: {} },
  unlockedAt: { type: Date, default: Date.now }
});
module.exports = mongoose.models.Reward || mongoose.model('Reward', RewardSchema);
