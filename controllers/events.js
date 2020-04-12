// Controller for the event collection.
const Event = require('../models/event');

// GET /events
module.exports.index = function(request, response, next) {
  Course.distinct('_id')
    .then(eventIDs => response.redirect(`/events/${eventIDs[0]}`))
    .catch(error => next(error));
};

// GET /events/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Events.findById(request.params.id),
    Events.distinct('_id')
  ];

  Promise.all(queries).then(function([event, eventIDs]) {
    if (event) {
      response.render('events/index', {event: event, eventIDs: eventIDs});
    } else {
      next(); // No such Event
    }
  }).catch(error => next(error));
};
