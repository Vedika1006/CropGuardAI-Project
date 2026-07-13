const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Helper function to create a token
const generateToken = (id) => {
  // This uses the JWT_SECRET from your .env file
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // Token will be valid for 30 days
  });
};


// --- User Registration Controller ---
const registerUser = async (req, res) => {
  try {
    // Get 'name' and 'password' from the request body
    const { name, password } = req.body;

    // 1. Check if user already exists
    const userExists = await User.findOne({ name });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Create a new user in the database
    // The password will be automatically hashed by the code in User.js
    const user = await User.create({
      name,
      password,
    });

    // 3. If user was created successfully...
    if (user) {
      // Create a token and send it back
      const token = generateToken(user._id);
      res.status(201).json({
        user: {
          id: user._id.toString(),
          name: user.name,
        },
        token: token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};


// --- User Login Controller ---
const loginUser = async (req, res) => {
  try {
    // Get 'name' and 'password' from the request body
    const { name, password } = req.body;

    // 1. Find the user in the database by name
    const user = await User.findOne({ name });

    // 2. If user exists AND the password is correct...
    // We use the 'comparePassword' method we created in User.js
    if (user && (await user.comparePassword(password))) {
      // Create a token and send it back
      const token = generateToken(user._id);
      res.status(200).json({
        user: {
          id: user._id.toString(),
          name: user.name,
        },
        token: token,
      });
    } else {
      // If user not found or password incorrect
      res.status(401).json({ message: 'Invalid name or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// Export the functions
module.exports = { registerUser, loginUser };