const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/database');


module.exports = function(passport){
  // local stradegy
  passport.use(new LocalStrategy(function(username, password, done){
    // match the username
    let query = {username: username}
    User.findOne(query, function(err,user){
      if(err) throw err;
      if(!user){
        console.log("WHAT");
        return done(null,false,{message:'No user found'});
      }
      // password match would be here

    });
  }))
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
