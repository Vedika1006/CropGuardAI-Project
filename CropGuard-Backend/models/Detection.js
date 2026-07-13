const mongoose = require('mongoose');

const detectionSchema = new mongoose.Schema({
  // Link this detection to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User', // This creates the relationship with our User model
  },
  // We won't store the image, just a path or filename (or nothing for now)
  image: {
    type: String,
  },
  cropType: {
    type: String,
    required: true,
    default: 'Unknown',
  },
  disease: {
    type: String,
    required: true,
    default: 'Healthy',
  },
  confidence: {
    type: Number,
    required: true,
    default: 0.95,
  },
  // Store the recommendations given to the user
  recommendations: {
    organic: { type: [String], default: () => ['No organic treatment specified.'] },
    chemical: { type: [String], default: () => ['No chemical treatment specified.'] },
    preventive: { type: [String], default: () => ['No preventive measures specified.'] },
  },
}, { timestamps: true }); // Automatically adds createdAt/updatedAt

const Detection = mongoose.model('Detection', detectionSchema);
module.exports = Detection;