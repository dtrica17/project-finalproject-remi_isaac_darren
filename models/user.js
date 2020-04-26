// Model for the user collection.
const mongoose = require('mongoose');

// Define the schema
const User = new mongoose.Schema({
  name: String
  username: String
});

// Export the model
module.exports = mongoose.model('User', User);
