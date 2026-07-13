const jwt = require('jsonwebtoken');
const User = require('../models/User');

// This function will "protect" our routes
const protect = async (req, res, next) => {
  let token;

  // Check if the request has an "Authorization" header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 1. Get the token from the header
      token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN_STRING"

      // 2. Verify the token using our JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3. Find the user in the database by the ID from the token
      // We attach the user to the 'req' object, so our controllers can use it
      req.user = await User.findById(decoded.id).select('-password'); // Don't include the password

      if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      // 4. Move on to the next step (e.g., the detection controller)
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };