const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const profileController = require('../controllers/profileController');
const auth = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/profile_images'); },
  filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage });

router.get('/', profileController.getProfile);
router.put('/', auth, profileController.updateProfile);
router.post('/image', auth, upload.single('image'), profileController.uploadProfileImage);

module.exports = router;
