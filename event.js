// Model for the event collection.
const mongoose = require('mongoose');

// Define the schema
const Event = new mongoose.Schema({
  _id: String,
  people_invited: String,
  description: String,
  location: [String],
  organizer: String,
  date: Date    // not sure this is how
});

// Export the model
module.exports = mongoose.model('Event', Event);
