const mongoose = require('mongoose');

const helpRequestSchema = new mongoose.Schema({
  // Link this request to a specific user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  title: {
    type: String,
    required: [true, 'Please add a brief title'],
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
  },
  status: {
    type: String,
    required: true,
    enum: ['Pending', 'In Progress', 'Resolved'], // Only allow these values
    default: 'Pending',
  },
}, { timestamps: true });

const HelpRequest = mongoose.model('HelpRequest', helpRequestSchema);
module.exports = HelpRequest;