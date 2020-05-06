const express = require('express')
const router = express.Router();
const User = require('../models/user');
const session = require('express-session');

// make user avaible everywhere
router.use(function(request, response, next) {
  response.locals.user = request.session.user;
  next();
});

// Register form
router.get('/register', function(req, res){
  res.render('register')
});

//Register process
router.post('/register',function(req, res){
  const name = req.body.name;
  const username = req.body.username;

    let newUser = new User({
      _id:username,
      name:name
    });
    newUser.save(function(err){
      // theres a better way to do this i know
      // this is a duplicate name error need to send a flash

      if(err){
        if(err.name === 'MongoError' && err.code === 11000){
            req.flash('danger', 'Username taken');
            res.redirect('back');
        }else {
        console.log(err);
        return;
      }
      }else{
        // no flash yet
        //req.flash('success', 'you are registered and can log in');
        req.flash("success", "You are registered and can now log in");
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
  req.session.user = null;
  req.flash("warning", "Logged out")
  console.log("Successful logout");
  res.redirect('/');
});



// login process
router.post('/login',function(req,res,next){
  queries = [
    User.find().where('_id').equals(req.body.username)
  ];
  // if that user exsists
  Promise.all(queries).then(function(result){
    console.log("result " + result)
    // go to home page
    if(result[0].length > 0){
      req.session.user = req.body.username;
      console.log("current user " +req.session.user);
      req.flash("info", "Logged in");
      res.redirect('/');
    }

    else{
      // this could be a flash
      req.flash("failure","No user found");
      res.redirect('back')
    }
  })
})



module.exports = router;
