// Model for the user collection.
const mongoose = require('mongoose');

// Define the schema
const User = new mongoose.Schema({
  name: {type: String, trim: true},
  _id: {type: String, required: true, trim: true}
});

// Export the model
module.exports = mongoose.model('User', User);
