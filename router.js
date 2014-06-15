var models = require('./models');

module.exports = function(app) {
  app.get('/about', function(req, res) {
      res.send('hello world');
  });
};
