// Controller for the event collection.
const Event = require('../models/event');
const Comment = require('../models/comment');



// GET /events
module.exports.index = function(request, response, next) {
  const order = request.query.sort || 'date'; // Default to sort by course
  Event.find().sort(order)
    .then(allEvents => response.redirect(`events/${allEvents[0]._id}`))
    .catch(error => next(error))
};

// GET /events/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Event.findById(request.params.id),
    Event.find()
  ];

  // code fails
  //Failed to lookup view "events/index" in views directory "./views"
  Promise.all(queries).then(function([event, allEvents]) {
    if (event) {
      response.render('events/index', {event: event, allEvents: allEvents});
    } else {
      next(); // No such Event
    }
  }).catch(error => next(error));
};
