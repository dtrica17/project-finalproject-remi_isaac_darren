const express = require('express');
const courses = require('./controllers/comments');
const sections = require('./controllers/events');
const sections = require('./controllers/users');


// Create the router
const router = express.Router();

// I HAVE NO IDEA WHICH OF THESE IS NEEDED OR WHAT THEY DO
// I JUST COPY PAST

// Handle events requests
router.get('/events', courses.index);
router.get('/events/:id', courses.retrieve);

// Handle comments requests
router.get('/comments', sections.index);
router.get('/comments/:id', courses.retrieve);

// Handle users requests
router.get('/users', sections.index);
router.get('/users/:id', courses.retrieve);


// Export the router
module.exports = router;
