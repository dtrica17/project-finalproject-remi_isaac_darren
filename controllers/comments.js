// Controller for the event collection.
const Event = require('../models/event');
const Comment = require('../models/comment');

const session = require('express-session');
const express = require('express');
const router = express.Router();


// delete an event
router.delete('/:id', function(req, res){
  let query = {_id:req.params.id}
  Comment.remove(query, function(err){
    if(err){console.log(err)}
    res.send('Success');
  })
})


module.exports = router;
