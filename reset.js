// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const Event = require('./models/event');
const Comment = require('./models/comment');
const User = require('./models/user');

// Connect to the database
connect();



// Model a collection of sections
const users = [
  new User({name: 'Isaac', username: 'OC'}),
  new User({name: 'Remi',username: 'Seniors'}),
  new User({name: 'Darren',username: 'ACE'}),
];

// Model a collection of courses
const events = [
  new Event({name: 'Senior Streak', people_invited: 'Seniors', location: 'The Quad', organizer: users[1], date:"2019-08-29", description:'All seniors streak across the quad (dont tell the freshmen)'}),
  new Event({name: 'Raft Day', people_invited: 'Everyone', location: 'The River', organizer: users[0], date:"2019-09-05", description:'A party at the river. Bring rafts and fun'}),
  new Event({name: 'Titus', people_invited: 'Ticket Owners', location: 'Titus Mountain', organizer: users[0], date:"2020-03-14", description:'A party at Titus mountain. Tickets selling for $30'}),
  new Event({name: 'Spring Fest', people_invited: 'Everyone', location: 'Intramural Field', organizer: users[2], date:"2020-04-15", description:'Huge concert! No drinks allowed!'})

];

const comments = [
  new Comment({author: 'Remi LeBlanc', event: 'Raft Day', comment: 'Hope the weather is nice!'}),
  new Comment({author: 'Isaac Brinkman', event: 'Titus', comment: '$30? What a rip off!'}),
  new Comment({author: 'Darren Ricalton', event: 'Spring Fest', comment: "Who's the artist this year? I recommend Remi LeBlanc."}),
];

// Reset the database
mongoose.connection.dropDatabase()
  .then(() => Promise.all(events.map(e => e.save())))
  .then(() => Promise.all(users.map(user => user.save())))
  .then(() => Promise.all(comments.map(comment => comment.save())))
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
