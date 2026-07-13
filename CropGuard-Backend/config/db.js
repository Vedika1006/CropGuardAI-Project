const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Get the connection string from the environment variables
    const mongoUri = process.env.MONGO_URI;

    if (!mongoUri) {
      console.error('MONGO_URI is not defined in .env file');
      process.exit(1); // Exit process with failure
    }

    // Attempt to connect to the database
    const conn = await mongoose.connect(mongoUri);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;