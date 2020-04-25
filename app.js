const express = require('express');
const session = require('express-session')
//const router = require('./router');
const connect = require('./db');

// connect to db
connect();

// Create the server
const app = express();

// configure the views
app.set('view engine', 'ejs');  // for some reason this is not working
app.set('views', './views');

// Parse request bosies like queries
app.use(express.urlencoded({extended: false}));

// Generate a session for each client
app.use(session({
  // i think here is where we need to get a specfic name
  name: 'catalog', // Name of client cookies
  secret: 'temporary', // Password for client cookies
  resave: false, // Recommended setting
  saveUninitialized: false // Recommended setting
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


const Event = require('./models/event');
// Redirect from the home page
app.get('/', function(request, response) {
  Event.find()
  // events/index does not exsist
  .then(allEvents => response.render('detail',{allEvents: allEvents}));
  //response.redirect('/calendar')
  //response.render('index');
});

// add router
app.get('/events/add',function(req, res){
  res.render('events/add');
});



// NEW
// Enter admin mode and return to the previous page
// I think this automatically makes you admin instead we need a way
// for an individual to log in
// app.get('/login', function(request, response) {
//   request.session.admin = true;
//   response.redirect('back');
// });

//Routing to login page
//app.use('/login', require('./views/users.js'));

// Exit admin mode and return to the previous page
app.get('/logout', function(request, response) {
  request.session.admin = false;
  response.redirect('back');
});

// Make the mode available in all views
app.use(function(request, response, next) {
  response.locals.admin = request.session.admin;
  next();
});
// NEW END

// Route content requests
// anything that uses users has to go to controllers/users
// let users = require('./controllers/users')
// app.use('/users', users)
// let events = require('./controllers/events')
// app.use('/events', events)

// Handle undefined routes
app.use(function(request, response) {
  console.log('Responded with 404');
  response.status(404).end();
});

// Handle other errors
app.use(function(error, request, response) {
  console.error(error.stack);
  response.status(500).send(error.message);
});

// Start the server
app.listen(3001);
console.log('Server is ready.');
