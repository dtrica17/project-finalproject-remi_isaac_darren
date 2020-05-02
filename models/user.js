// Model for the user collection.
const mongoose = require('mongoose');

// Define the schema
const User = new mongoose.Schema({
  name: {type: String, trim: True},
  username: {type: String, required: True, trim: True}
});

// Export the model
module.exports = mongoose.model('User', User);
