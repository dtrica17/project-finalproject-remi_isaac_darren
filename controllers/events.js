// Controller for the event collection.
const Event = require('../models/event');

// GET /events
module.exports.index = function(request, response, next) {
  Event.distinct('_id')
    //.then(eventIDs => response.redirect(`/events/${eventIDs[0]}`))
    .then(eventIDs => response.redirect('/events/index'))
    .catch(error => next(error))
    .then(console.log("im here"));
};

// GET /events/:id
module.exports.retrieve = function(request, response, next) {

  const queries = [
    Event.findById(request.params.id),
    Event.distinct('_id')
  ];

  // code fails
  //Failed to lookup view "events/index" in views directory "./views"
  Promise.all(queries).then(function([eve, eventIDs]) {
    if (eve) {
      response.render('events/index', {event: eve, eventIDs: eventIDs});
    } else {
      next(); // No such Event
    }
  }).catch(error => next(error));
};
