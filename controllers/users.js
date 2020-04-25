const express = require('express')
const router = express.Router();

const User = require('../models/user');

// Register form
router.get('/register', function(req, res){
  res.render('register')
});

//Register process
router.post('/register',function(req, res){
  const username = req.body.username;
  req.checkBody('username', 'Username is required').notEmpty();

  let errors = req.validationErrors();
  if(errors){
    res.render('register',{
      errors:errors
    })
  }else{
    let newUser = new User({
      username:username
    });
    newUser.save(function(err){
      // theres a better way to do this i know
      if(err){
        console.log(err);
        return;
      }else{
        req.flash('success', 'you are registered and can log in');
        res.redirect('/user/login');
      }
    }); // I think this is in the correct place
  }
});

router.get('/login',function(req, res){
  res.render('login');
})

module.exports = router;
