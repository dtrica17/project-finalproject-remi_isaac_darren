// Controller for the event collection.
const Event = require('../models/event');
const Comment = require('../models/comment');



// GET /events
module.exports.index = function(request, response, next) {
  const order = request.query.sort || '_id'; // Default to sort by course
  Event.find().sort(order)
    .then(allEvents => response.redirect(`events/${allEvents[0]._id}`))
    //then(allEvents => response.render("events/detail"))

    .catch(error => next(error))
};
//Get /events/Calendar



// GET /events/:id
module.exports.retrieve = function(request, response, next) {
  const queries = [
    Event.findById(request.params.id),
    Event.find(),
    Comment.find().where('event').equals(request.params.id)
  ];

  Promise.all(queries).then(function([event, allEvents, comments]) {
    console.log(event)
    if (event) {
      //console.log(comments[0].comment);
      response.render('events/index', {event: event, allEvents: allEvents, comments: comments});
    }
    else {
      next(); // No such Event
    }
  }).catch(error => next(error));
};
