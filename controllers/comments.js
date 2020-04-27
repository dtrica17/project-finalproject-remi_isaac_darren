// Controller for the event collection.
const Event = require('../models/event');
const Comment = require('../models/comment');

const session = require('express-session');
const express = require('express');
const router = express.Router();


// delete a comment
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}
  Comment.remove(query, function(err){
    if(err){console.log(err)}
    res.send('Success');
  })
})

// post a new comment
router.post('/add', function(req,res){
  let c = new Comment();
  c.author = req.session.user;
  c.event = req.body.event;
  c.comment = req.body.comment;


  c.save(function(err){
    if(err){
      console.log(err);
      return;
    }
    else{
      res.redirect('back');
    }
  })
})


module.exports = router;
