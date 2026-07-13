const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

const app = express();

// Allow cross-origin requests from the Expo app (web/device/emulator)
app.use(cors());

// Body Parser Middleware
// This allows us to accept JSON data in req.body
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- Test Route ---
app.get('/', (req, res) => {
  res.send('CropGuard AI Backend is running...');
});

// --- API Routes ---
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/detect', require('./routes/detectionRoutes'));
app.use('/api/support', require('./routes/supportRoutes'));


// --- Server Startup ---
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Local:   http://localhost:${PORT}`);
});