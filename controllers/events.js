// Controller for the event collection.
const Event = require('../models/event');

// GET /events
module.exports.index = function(request, response, next) {
  Event.distinct('_id')
    .then(eventIDs => response.redirect(`/events/${eventIDs[0]}`))
    .catch(error => next(error));
};

// GET /events/:id
module.exports.retrieve = function(request, response, next) {

  const queries = [
    Event.findById(request.params.id),
    Event.distinct('_id')
  ];
// im not sure its getting here
// everyime this runs it goes to
// cs-linuxlab-##.stlawu:3000/events/undefined
// should be going to events/index

  Promise.all(queries).then(function([eve, eventIDs]) {
    if (eve) {
      response.render('Events/index', {event: eve, eventIDs: eventIDs});
    } else {
      next(); // No such Event
    }
  }).catch(error => next(error));
};
