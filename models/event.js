// Model for the event collection.
const mongoose = require('mongoose');

// Define the schema
const Event = new mongoose.Schema({
  _id: {type: String, required: true, trim: true},  // the name is now the id
  people_invited: {type: String, default: "Everyone", trim: true},
  location: {type: String, required: true, trim: true},
  organizer: {type: String, required: true, trim: true},
  date: {type: Date, required: true},    // not sure this is how
  description: {type: String, trim: true}

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
