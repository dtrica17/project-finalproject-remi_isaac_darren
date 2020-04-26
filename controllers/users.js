const express = require('express')
const router = express.Router();
const User = require('../models/user');

// Register form
router.get('/register', function(req, res){
  res.render('register')
});

//Register process
router.post('/register',function(req, res){
  const name = req.body.name;
  const username = req.body.username;
  // these cant be added yet
  // req.checkBody('username', 'Username is required').notEmpty();
  // req.checkBody('name', 'name is required').notEmpty();

  //let errors = req.validationErrors();
  // if(errors){
  //   res.render('register',{
  //     errors:errors
  //   })
  //}else{
    let newUser = new User({
      name:name,
      username:username
    });
    newUser.save(function(err){
      // theres a better way to do this i know
      if(err){
        console.log(err);
        return;
      }else{
        // no flash yet
        //req.flash('success', 'you are registered and can log in');
        console.log('success', 'you are registered and can log in');
        res.redirect('/users/login');
      }
    }); // I think this is in the correct place
  //}
});

router.get('/login',function(req, res){
   User.find()
   .then(allUsers => res.render('login', {allUsers: allUsers}))
});

// login process
router.post('/login',function(req,res,next){
  // if that user exsists
  // go to home page
  if(User.find().where(username).equals(req.body.username)){
    res.redirect('/');
  }
  else{
    // this could be a flash
    console.log("No user found");
  }

});

module.exports = router;
