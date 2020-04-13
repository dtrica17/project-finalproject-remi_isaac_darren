// Controller for the event collection.
const Event = require('../models/event');


module.exports.index = function(request, response, next) {
  const order = request.query.sort || '_id';

  Event.find().sort(date)
    .then(stores => response.render('events/index', {events: event, date: date}))
    .catch(error => next(error));
};
/*
// GET /events
module.exports.index = function(request, response, next) {
  Event.distinct('_id')
    //.then(eventIDs => response.redirect(`/events/${eventIDs[0]}`))
    .then(eventIDs => response.render('/events/index.ejs'))
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
*/
