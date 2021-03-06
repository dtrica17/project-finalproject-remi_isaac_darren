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
    req.flash("warning", "Comment Deleted");
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
    // if the comment is empty
    if(c.comment == ''){
      console.log("no comment");
      req.flash("danger", "Comment cannot be empty");
      res.redirect('back');
    }
    else if(err){
      console.log(err);
      return;
    }
    else{
      req.flash("success", "Comment Added")
      res.redirect('back');
    }
  })
})


module.exports = router;
