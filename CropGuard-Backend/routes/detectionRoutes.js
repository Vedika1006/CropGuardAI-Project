const express = require('express');
const router = express.Router();
const { detectDisease, getDetectionHistory } = require('../controllers/detectionController');
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// --- Define the routes ---

// POST /api/detect
// This route is...
// 1. Protected: You must be logged in ('protect')
// 2. An Upload Route: It expects a file named 'image' ('upload')
// 3. Will call the 'detectDisease' function
router.post('/', protect, upload, detectDisease);

// GET /api/detect
// 1. Protected: You must be logged in ('protect')
// 2. Will call the 'getDetectionHistory' function
router.get('/', protect, getDetectionHistory);

module.exports = router;
