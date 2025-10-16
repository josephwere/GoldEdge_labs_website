// Uses models from 3_Database
const Profile = require('../models/Profile') || null;

exports.getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) profile = new Profile();
    Object.assign(profile, req.body);
    await profile.save();
    res.json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.uploadProfileImage = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
  try {
    const profile = await Profile.findOne() || new Profile();
    profile.image = `/uploads/profile_images/${req.file.filename}`;
    await profile.save();
    res.json({ imageUrl: profile.image });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
