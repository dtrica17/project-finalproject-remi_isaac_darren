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
  new Event({name: 'Senior Streak', people_invited: 'Seniors', location: 'The Quad', organizer: 'Seniors', date:new Date("August 29, 2020 10:00"), description:'All seniors streak across the quad (dont tell the freshmen)'}),
  new Event({name: 'Raft Day', people_invited: 'Everyone', location: 'The River', organizer: 'OC', date:new Date("September 05, 2020 11:00"), description:'A party at the river. Bring rafts and fun'}),
  new Event({name: 'Titus', people_invited: 'Ticket Owners', location: 'Titus Mountain', organizer: 'OC', date:new Date("March 14, 2020 9:45"), description:'A party at Titus mountain. Tickets selling for $30'}),
  new Event({name: 'Spring Fest', people_invited: 'Everyone', location: 'Intramural Field', organizer: 'ACE', date:new Date("April 15, 2021 16:00"), description:'Huge concert! No drinks allowed!'})

];

// Model a collection of sections
const users = [
  new User({name: 'John Doe', username: 'OC'}),
  new User({name: 'Jill Doe',username: 'Seniors'}),
  new User({name: 'Joe Doe',username: 'ACE'}),
  new User({name: 'Remi LeBlanc', username: 'Rwleb'}),
  new User({name: 'Isaac Brinkman', username: 'ibrin'}),
  new User({name: 'Darren Ricaltion', username: 'rdica'})

];

const comments = [
  new Comment({author: 'Rwleb', event: 'Raft Day', comment: 'Hope the weather is nice!'}),
  new Comment({author: 'ibrin', event: 'Titus', comment: '$30? What a rip off!'}),
  new Comment({author: 'rdica', event: 'Spring Fest', comment: "Who's the artist this year? I recommend Remi LeBlanc."})
];

// Reset the database
mongoose.connection.dropDatabase()
  .then(() => Promise.all(events.map(e => e.save())))
  .then(() => Promise.all(users.map(user => user.save())))
  .then(() => Promise.all(comments.map(comment => comment.save())))
  .then(() => mongoose.connection.close())
  .then(() => console.log('Database is ready.'))
  .catch(error => console.error(error.stack));
