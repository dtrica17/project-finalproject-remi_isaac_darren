// Model for the comment collection.
const mongoose = require('mongoose');

// Define the schema
const Comment = new mongoose.Schema({
  _id: String,
  event: String,
  comment: String
});

// Export the model
module.exports = mongoose.model('Comment', Comment);
