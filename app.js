var express = require('express'),
    app = express(),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    router = require('./router')(app),
    config = require('./config');

app.use(logger());
app.use(express.static(__dirname + '/public'));

mongoose.connect(config.db.host);

mongoose.connection.on('error', function (err) {
    console.error('Mongo Connection ', err);
});

mongoose.connection.once('open', function callback() {
    console.log('Mongo Connection OK.');
    app.listen(config.app.port);
});



