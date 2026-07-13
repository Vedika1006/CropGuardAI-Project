const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// This is the "schema" or blueprint for our User data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    unique: true, // No two users can have the same name
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  // This automatically adds "createdAt" and "updatedAt" fields
}, { timestamps: true });

// --- Mongoose "Middleware" ---
// This code runs *before* a new user is saved to the database
userSchema.pre('save', async function (next) {
  // If the password hasn't been changed, skip this
  if (!this.isModified('password')) {
    return next();
  }
  
  // "Hash" the password for security
  // We don't store plain text passwords!
  const salt = await bcrypt.genSalt(10); // Create a "salt"
  this.password = await bcrypt.hash(this.password, salt); // Apply the salt
  next();
});

// Helper method to check password on login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model and export it
const User = mongoose.model('User', userSchema);
module.exports = User;