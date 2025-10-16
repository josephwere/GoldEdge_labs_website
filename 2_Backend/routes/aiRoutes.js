const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
router.post('/message', aiController.getAIResponse);
module.exports = router;
