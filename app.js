const express = require('express');
const session = require('express-session');
//const router = require('./router');
const connect = require('./db');
const flash = require('connect-flash');


// connect to db
connect();

// Create the server
const app = express();

// configure the views
app.set('view engine', 'ejs');  // for some reason this is not working
app.set('views', './views');

//Set public folder
app.use(express.static('./public'))

//Express messages middleware
app.use(require('connect-flash')());
app.use(function(req,res,next){
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// Parse request bosies like queries
app.use(express.urlencoded({extended: false}));

// Generate a session for each client
app.use(session({
  // i think here is where we need to get a specfic name
  name: 'non-Academic events', // Name of client cookies
  secret: 'temporary', // Password for client cookies
  resave: true, // Recommended setting
  saveUninitialized: true // Recommended setting
}));

// Ignore icon requests
app.get('/favicon.ico', function(request, response) {
  response.status(204).end();
});



// Log requests to the console
//request.body is undefined...
app.use(function(request, response, next) {
  console.log('--------------------------', new Date().toLocaleTimeString());
  console.log(request.method, request.url);
  console.log('Body =', request.body);
  next();
});

// make user avaible from all routes
app.get('*',function(req,res,next){
  res.locals.user = req.session.user || null;
  next();
});


let Event = require('./models/event');
// Redirect from the home page
app.get('/', function(request, response) {
  Event.find()
  // events/index does not exsist
  .then(allEvents => response.render('detail',{allEvents: allEvents}))
  .catch(error => next(error))
  //response.redirect('/calendar')
  //response.render('index');
});

// Route files
let events = require('./controllers/events');
// anything that starts /events will go to above file
app.use('/events',events);

let users = require('./controllers/users');
// anything that starts /users will go to above file
app.use('/users',users);

let comments = require('./controllers/comments');
app.use('/comments',comments);

// Handle undefined routes
app.use(function(request, response) {
  console.log('Responded with 404');
  response.status(404).end();
});


// Handle duplicate ID errors
app.use(function(error, request, response, next) {
  if (error.name === 'MongoError' && error.code === 11000) {
    console.log('Validation error: Duplicate ID');
    response.status(400).send('Duplicate ID');
  } else {
    next(error);
  }
});

// I believe these below will only be called if error handling is not prperly set up
// Handle cast errors
app.use(function(error, request, response, next) {
  if (error.name === 'CastError') {
    console.log('Validation error:', error.message);
    const start = error.message.indexOf('path') + 6;
    const stop = error.message.length - 1;
    const field = error.message.substring(start, stop);
    response.status(400).send(`Invalid ${field}`);
  } else {
    next(error);
  }
});

// Handle validation errors
app.use(function(error, request, response, next) {
  if (error.name === 'ValidationError') {
    const messages = [];
    for (const field in error.errors) {
      console.log('Validation error:', error.errors[field].message);
      messages.push(error.errors[field].message);
    }
    response.status(400).send(messages.join('\n'));
  } else {
    next(error);
  }
});

// Handle other errors
app.use(function(error, request, response) {
  console.error(error.stack);
  response.status(500).send(error.message);
});

// Start the server
app.listen(3000);
console.log('Server is ready.');
