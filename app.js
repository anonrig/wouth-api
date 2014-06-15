var express = require('express'),
    app = express(),
    router = require('./router')(app),
    logger = require('morgan');

app.use(logger());
app.use(express.static(__dirname + '/public'));;

app.listen(3000);
