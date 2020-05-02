// Controller for the event collection.
const Event = require('../models/event');
const Comment = require('../models/comment');
const User = require('../models/user');

const session = require('express-session');
const express = require('express');
const router = express.Router();


// Check for admin status
const authorize = function(request, response, next) {
  if (request.session.user) {
    next(); // Fulfill the request
  } else {
    response.status(401).end();
  }
};


router.get('/myEvents',function(req,res){
  if(req.session.user){
      query = [
        Event.find().where('organizer').equals(req.session.user)
      ];
      Promise.all(query).then(function([myEvents]) {
        console.log("my Events: " + myEvents);
        res.render('events/myEvents',{user: req.session.user, myEvents: myEvents})
    });
  } else {
    console.log('not logged in');
    res.redirect('/');
  }

});


// add router
router.get('/add',function(req, res){
  res.render('events/add');
});

// add Submit post route
router.post('/add', function(req,res){
  if(session.user != null){
    let event = new Event();
    event.name = req.body.title;
    event.people_invited = req.body.people_invited;
    event.location = req.body.location;
    event.organizer = req.session.user;
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
  }
  else{
    console.log("Not Logged in");
  }

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
//<%=eve.date.getFullYear()-%>-<%=eve.date.getMonth()-%>-<%=eve.date.getDay()-%>."<%_.trim()-%>
router.get('/edit/:id',function(req,res){
  const queries = [
    Event.findById(req.params.id),
    Comment.find().where('event').equals(Event.findById(req.params.id).name)
  ];
  Promise.all(queries).then(function([eve, comments]) {
    if (eve) {
      const date = eve.date.toISOString().substring(0,16);
      console.log(date);
      res.render('events/edit_event', {
        eve: eve,
        comments: comments,
        date: date});
    }
  }).catch(error => console.log(error));
})

// Get a single article
// this needs to be at the bottoms
router.get('/:id',function(req,res){
  const query = [
    // this comments isnt working but should
    Event.findById(req.params.id)
    //Comment.find().where('event').equals((req.params.id).name),
  ];

  Promise.all(query).then(function([eve]) {
    const queries = [
      Event.findById(req.params.id),
      Comment.find().where('event').equals(eve.name),
      User.find().where('_id').equals(req.session.user)

    ];
    Promise.all(queries).then(function([eve, comments, owner]){
      console.log('owner ' + owner);
      console.log('events ' + eve.name);
      console.log('commments '+ comments);
      console.log(Event.findById(req.params.id).name);

      if (eve) {
        res.render('events/browse', {event: eve,comments: comments, owner:owner[0]});
      }
      })
    }).catch(error => console.log(error));

});

module.exports = router;
