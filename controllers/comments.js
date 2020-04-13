module.exports.index = function(request, response) {
  response.send('GET /comments');
};

module.exports.retrieve = function(request, response) {
  response.send(`GET /comments/${request.params.id}`);
  
};
