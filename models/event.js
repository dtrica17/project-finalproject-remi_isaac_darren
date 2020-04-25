// Model for the event collection.
const mongoose = require('mongoose');

// Define the schema
const Event = new mongoose.Schema({
  name: String,
  people_invited: String,
  location: String,
  organizer: String,
  date: String,    // not sure this is how
  description: String

});

// Taken from phase-1
// Convert incoming time strings to Date objects
// Section.path('time').set(function(time) {
//   return new Date(`1/15/2020 ${time}`);
// });

Event.path('date').set(function(date) {
  return new Date(`${date}`);
});

// // Provide a 12-hour time string as a virtual property
// Section.virtual('time12').get(function() {
//   return this.time.toLocaleTimeString('en-US', {hour: 'numeric', minute: 'numeric'});
// });
//
// // Provide a 24-hour time string as a virtual property
// Section.virtual('time24').get(function() {
//   return this.time.toLocaleTimeString('en-US', {hour12: false});
// });

// Export the model
module.exports = mongoose.model('Event', Event);
