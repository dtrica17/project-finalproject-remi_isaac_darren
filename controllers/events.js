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

// POST /event (with the new event in the request)
module.exports.create = function(request, response, next){
  // creates an event out of the request.body
  Event.create(request.body)
  // update status to 201
  .then(course => response.status(201).send(event.id))
  .catch(error => next(error))
};

module.exports.delete = function(request, response, next) {
  // find an event by given ID and delete it
  Event.findByIdAndDelete(request.params.id)
    // if succesful response 200 otherwise next
    .then(course => course ? response.status(200).end() : next())
    .catch(error => next(error));
};

// PUT /event/:id (with the changes in the request body)
module.exports.update = function(request, response, next) {
  // find by specfic id and update it to body
  Course.findByIdAndUpdate(request.params.id, request.body)
  // if succesful 200 else next()
    .then(course => course ? response.status(200).end() : next())
    .catch(error => next(error));
};
