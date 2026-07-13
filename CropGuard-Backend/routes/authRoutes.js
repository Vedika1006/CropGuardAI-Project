const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// --- Define the routes ---

// POST /api/auth/register
// This will call the 'registerUser' function
router.post('/register', registerUser);

// POST /api/auth/login
// This will call the 'loginUser' function
router.post('/login', loginUser);

module.exports = router;