const multer = require('multer');

// Configure Multer to store files in memory (for now)
// This is simple and avoids saving the file to disk on the server
const storage = multer.memoryStorage();

// We only want to accept a single file named "image"
const upload = multer({ storage: storage }).single('image');

module.exports = upload;

