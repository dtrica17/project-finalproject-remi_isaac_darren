// Controller for the event collection.
const Event = require('../models/event');



// GET /events
module.exports.index = function(request, response, next) {
  const order = request.query.sort || '_id'; // Default to sort by course
  Event.find().sort(order)
    .then(allEvents => response.render('events/detail'))

    .catch(error => next(error))
};
//Get /events/Calendar
