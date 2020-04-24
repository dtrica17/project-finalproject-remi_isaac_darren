// Model for the comment collection.
const mongoose = require('mongoose');

// Define the schema
const Comment = new mongoose.Schema({
  author: String,
  event: String,
  comment: String
});

// Export the model
module.exports = mongoose.model('Comment', Comment);
