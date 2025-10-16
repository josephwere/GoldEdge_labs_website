const express = require('express');
const router = express.Router();
const rewardController = require('../controllers/rewardController');
const auth = require('../middleware/authMiddleware');

router.get('/leaderboard', rewardController.getLeaderboard);
router.post('/add', auth, rewardController.addPoints);

module.exports = router;
