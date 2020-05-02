// Model for the comment collection.
const mongoose = require('mongoose');

// Define the schema
const Comment = new mongoose.Schema({
  author: {type: String, required: True, trim: True},
  event: {type: String, required: True, trim: True},
  comment: {type: String, required: True, trim: True}
});

// Export the model
module.exports = mongoose.model('Comment', Comment);
