var express = require('express'),
    app = express(),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'),
    bodyParser = require('body-parser');

app.use(logger());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});

// Register routes. (Keep this after generic app.use middleware(s))
require('./router')(app);

mongoose.connect(config.db.host);

mongoose.connection.on('error', function(err) {
    console.error('Mongo Connection ', err);
});

mongoose.connection.once('open', function callback() {
    console.log('Mongo Connection OK.');
    app.listen(config.app.port);
});
