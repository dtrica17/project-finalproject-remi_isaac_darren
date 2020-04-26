// Controller for the event collection.
const Event = require('../models/event');
const Comment = require('../models/comment');
const express = require('express');
const router = express.Router();

let Comment = require('./models/comment')
// Get a single article
router.get('/:id',function(req,res){
  const queries = [
    Event.findById(req.params.id),
    Comment.find().where('event').equals(req.params.id)
  ];
  Promise.all(queries).then(function([eve, comments]) {
    if (eve) {
      res.render('events/browse', {event: eve,comments: comments});
    }
  }).catch(error => console.log(error));
})



// add router
router.get('/add',function(req, res){
  res.render('events/add');
});

// add Submit post route
router.post('/add', function(req,res){
  let event = new Event();
  event.name = req.body.title;
  event.people_invited = req.body.people_invited;
  event.location = req.body.location;
  event.date = req.body.date;   // this prolly wont work right
  event.description = req.body.description;

  event.save(function(err){
    if(err){
      console.log(err);
      return;
    }
    else{
      res.redirect('/');
    }
  })
})

// Update submit
router.post('/edit/:id', function(req,res){
  let eve = {}
  eve.name = req.body.title;
  eve.people_invited = req.body.people_invited;
  eve.location = req.body.location;
  eve.date = req.body.date;   // this prolly wont work right
  eve.description = req.body.description;

  let query = {_id:req.params.id}

  Event.update(query, eve, function(err){
    if(err){
      console.log(err);
      return;
    }
    else{
      res.redirect('/');
    }
  })
})

// delete an event
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}
  Event.remove(query, function(err){
    if(err){console.log(err)}
    res.send('Success');
  })
})

// load edit form
router.get('/edit/:id',function(req,res){
  const queries = [
    Event.findById(req.params.id),
    Comment.find().where('event').equals(req.params.id)
  ];
  Promise.all(queries).then(function([eve, comments]) {
    if (eve) {
      res.render('events/edit_event', {
        eve: eve,
        comments: comments});
    }
  }).catch(error => console.log(error));
})

module.exports = router;
