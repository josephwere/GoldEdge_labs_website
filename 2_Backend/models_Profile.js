// Note: models live in 3_Database for canonical source. This file is a simple reference.
const mongoose = require('mongoose');
const ProfileSchema = new mongoose.Schema({
  name: String, age: Number, dob: String, gender: String, nationality: String, occupation: String,
  contact: String, email: String, bio: String, image: String
});
module.exports = mongoose.model('Profile', ProfileSchema);
