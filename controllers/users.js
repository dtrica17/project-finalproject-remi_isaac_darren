const express = require('express')
const router = express.Router();
const User = require('../models/user');
const session = require('express-session');

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

//logout
router.get('/logout',function(req,res){
  if(req.session.user == null){
    res.redirect('/');
  }
  console.log("user out: " + req.session.user)
  res.render('logout',{user:req.session.user});
});

router.post('/logout',function(req,res,next){
  req.session.user = null;
  console.log("Successful logout");
  res.redirect('/');


});


// login process
router.post('/login',function(req,res,next){
  queries = [
    User.find().where('username').equals(req.body.username)
  ];
  // if that user exsists
  Promise.all(queries).then(function(result){
    console.log(result)
    // go to home page
    if(result[0].length > 0){
      req.session.user = req.body.username
      console.log(req.session.user);
      res.redirect('/');
    }

    else{
      // this could be a flash
      console.log("No user found");
    }
  })
})

// make user avaible everywhere
app.use(function(request, response, next) {
  response.locals.user = request.session.user;
  next();
});

module.exports = router;
