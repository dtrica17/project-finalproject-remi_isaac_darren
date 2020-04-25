const User = require('../models/user');


// get a specfic login
module.exports.retrieve = function(request, response) {
  const user = Users.find(u => u.id === request.params.id);
  // if the user doesn't exsist
  // next should say "doesnt exsist"
  if (!user) {
    next(); // Leads to 404
  // if the user does exsist need to login
  } else {
    response.send(user);
  }};
