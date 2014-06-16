var routes = require('./routes');


module.exports = function(app) {
    app.use('/wouths', routes.gossip);
    app.use('/auth', routes.auth);
    app.use('/users', routes.user);
};
