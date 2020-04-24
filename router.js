const express = require('express');
const comments = require('./controllers/comments');
const events = require('./controllers/events');
const users = require('./controllers/users');


// Create the router
const router = express.Router();

// I HAVE NO IDEA WHICH OF THESE IS NEEDED OR WHAT THEY DO
// I JUST COPY PAST

// NEW
// Check for admin status
const authorize = function(request, response, next) {
  if (request.session.admin) {
    next(); // Fulfill the request
  } else {
    response.status(401).end();
  }
};
// NEW END

// Handle events requests
router.get('/events', events.index);
router.get('/events/:id', events.retrieve);
router.post('/events', authorize, events.create);
router.delete('/events/:id', authorize, events.delete);
router.put('/events/:id', authorize, events.update);

/*
// Handle comments requests
router.get('/comments', comments.index);
router.get('/comments/:id', comments.retrieve);
router.post('/comments', authorize, comments.create);
router.delete('/comments/:id', authorize, comments.delete);
router.put('/comments/:id', authorize, comments.update);
*/
// Handle users requests
router.get('/users', users.index);
router.get('/users/:id', users.retrieve);
// router.post('/users', authorize, users.create);
// router.delete('/users/:id', authorize, users.delete);
// router.put('/users/:id', authorize, users.update);


// Export the router
module.exports = router;
