var express = require('express'),
    app = express(),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    config = require('./config'),
    passport= require('passport'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

app.use(logger());
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
app.use(session(config.app.session));
app.use(passport.initialize());
app.disable('x-powered-by');

// Register routes. (Keep this after generic app.use middleware(s))
require('./router')(app);
require('wouth/lib/auth');

mongoose.connect(config.db.host);

mongoose.connection.on('error', function(err) {
    console.error('Mongo Connection ', err);
});

mongoose.connection.once('open', function callback() {
    console.log('Mongo Connection OK.');
    app.listen(config.app.port);
});
