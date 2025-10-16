const Reward = require('../models/Reward') || null;

exports.getLeaderboard = async (req, res) => {
  try {
    const users = await Reward.find().sort({ points: -1 }).limit(10);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addPoints = async (req, res) => {
  try {
    const { username, points } = req.body;
    let user = await Reward.findOne({ username });
    if (!user) user = new Reward({ username, points: 0 });
    user.points += points;
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
