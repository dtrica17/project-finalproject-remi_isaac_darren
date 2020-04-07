module.exports.index = function(request, response) {
  response.send('GET /events');
};

module.exports.retrieve = function(request, response) {
  response.send(`GET /events/${request.params.id}`);
};
