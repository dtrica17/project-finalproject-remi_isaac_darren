// Controller for the event collection.
const Event = require('../models/event');
const Comment = require('../models/comment');
const User = require('../models/user');

const session = require('express-session');
const express = require('express');
const router = express.Router();

//
// // Check for logged in status status
// const authorize = function(request, response, next) {
//   if (request.session.user) {
//     next(); // Fulfill the request
//   } else {
//     response.status(401).end();
//   }
// };


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
  if(req.session.user == null){
    console.log("Not Logged in")
    res.redirect("back");
  }
  else{
    res.render('events/add');

  }
});

// add Submit post route
// this is not working
router.post('/add', function(req,res){
    console.log("creating");
    let event = new Event();
    event._id = req.body.title;
    if(req.body.people_invited == ""){
      event.people_invited = "Everyone";
    }else {
      event.people_invited = req.body.people_invited;
    }
    event.location = req.body.location;
    event.organizer = req.session.user;
    event.date = req.body.date;   // this prolly wont work right
    event.description = req.body.description;

    event.save(function(err){
      if(err){
        if (err.name === 'MongoError' && err.code === 11000) {
          req.flash("Failure", event._id + " already exsists")
          res.redirect('back');
        }
        if(err.name === 'ValidationError'){
          req.flash("warning", "Missing Fields");
          res.redirect("back");
        } else {
          console.log(err);

        }
      }
      else{
        req.flash("success",'Event Added');
        res.redirect('back');
      }
    })

})

// Update submit
router.post('/edit/:id', function(req,res){
  let eve = {}

  eve._id = req.body.title;
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
      req.flash("success", "Event Updated")
      res.redirect('/');
    }
  })
})

// delete an event
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}
  Event.remove(query, function(err){
    if(err){console.log(err)}
    req.flash("warning", "Event Deleted");
    res.send('Success');
  })
})

// load edit form
router.get('/edit/:id',function(req,res){

    const queries = [
    Event.findById(req.params.id),
    Comment.find().where('event').equals(Event.findById(req.params.id)._id)
  ];
  Promise.all(queries).then(function([eve, comments]) {
    if(req.session.user !== eve.organizer){
      return res.status(401).end();
    }
    else if (eve) {
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
// this needs to be at the bottom
router.get('/:id',function(req,res){
  const query = [
    Event.findById(req.params.id)
  ];

  Promise.all(query).then(function([eve]) {
    const queries = [
      Event.findById(req.params.id),
      Comment.find().where('event').equals(eve._id),
      User.find().where('_id').equals(req.session.user)
    ];

    Promise.all(queries).then(function([eve, comments, owner]){
      console.log('owner ' + owner);
      console.log('events ' + eve._id + eve.organizer);
      console.log('commments '+ comments);

      if (eve) {
        res.render('events/browse', {event: eve,comments: comments, owner:owner[0]});
      }
      })
    }).catch(error => console.log(error));

});

module.exports = router;
