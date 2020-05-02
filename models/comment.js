// Model for the comment collection.
const mongoose = require('mongoose');

// Define the schema
const Comment = new mongoose.Schema({
  author: {type: String, required: true, trim: true},
  event: {type: String, required: true, trim: true},
  comment: {type: String, required: true, trim: true}
});

// Export the model
module.exports = mongoose.model('Comment', Comment);
