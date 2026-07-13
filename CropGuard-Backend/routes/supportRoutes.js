const express = require('express');
const router = express.Router();
const { submitIssueReport, submitHelpRequest } = require('../controllers/supportController');
const { protect } = require('../middleware/authMiddleware');

// --- Define the routes ---

// POST /api/support/issue
// Submits a "Report Issue" form
// Protected: Must be logged in
router.post('/issue', protect, submitIssueReport);

// POST /api/support/help
// Submits a "Request Expert Help" form
// Protected: Must be logged in
router.post('/help', protect, submitHelpRequest);

module.exports = router;