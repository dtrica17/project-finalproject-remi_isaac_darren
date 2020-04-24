// Script for setting up a database.
const mongoose = require('mongoose');
const connect = require('./db');
const Event = require('./models/event');
const Comment = require('./models/comment');
const User = require('./models/user');

// Connect to the database
connect();

// Model a collection of courses
const events = [
  new Event({_id: 'Senior Streak', people_invited: 'Seniors', location: 'The Quad', organizer: 'Seniors', date: new Date("2019-08-29T20:00:00Z"), description:'All seniors streak across the quad (dont tell the freshmen)'}),
  new Event({_id: 'Raft Day', people_invited: 'Everyone', location: 'The River', organizer: 'OC', date: new Date("2019-09-05T16:00:00Z"), description:'A party at the river. Bring rafts and fun'}),
  new Event({_id: 'Titus', people_invited: 'Ticket Owners', location: 'Titus Mountain', organizer: 'OC', date: new Date("2020-03-14T10:00:00Z"), description:'A party at Titus mountain. Tickets selling for $30'}),
  new Event({_id: 'Spring Fest', people_invited: 'Everyone', location: 'Intramural Field', organizer: 'ACE', date: new Date("2020-04-15T17:00:00Z"), description:'Huge concert! No drinks allowed!'})

];

// Model a collection of sections
const users = [
  new User({_id: 'OC'}),
  new User({_id: 'Seniors'}),
  new User({_id: 'ACE'}),
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
