// Controller for the course collection.
const Event = require('../models/event');

// GET /courses
module.exports.index = function(request, response, next) {
  Course.distinct('_id')
    .then(eventIDs => response.redirect(`/events/${eventIDs[0]}`))
    .catch(error => next(error));
};

// GET /courses/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Course.findById(request.params.id),
    Course.distinct('_id')
  ];

  Promise.all(queries).then(function([course, courseIDs]) {
    if (event) {
      response.render('events/index', {event: event, eventIDs: eventIDs});
    } else {
      next(); // No such course
    }
  }).catch(error => next(error));
};
