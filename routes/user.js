var express = require('express'),
    models = require('../models'),
    User = models.User;

var user = express.Router();

function authenticatedMiddleware (req, res, next){
    if (req.user) {
        next();
    }
    else {
        res.send(401);
    }
};

user.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err)
            return res.send(500, err);
        res.json(users);
    }, function(err) {
        res.send(500);
    });
});

user.post('/', function(req, res) {
    new User({
        username: req.body.username,
        image: req.body.image,
        email: req.body.email,
        password: User.generateHash(req.body.password),
        reminder: null,
        following: null,
        followers: null,
        created_at: Date.now(),
        updated_at: Date.now()
    })
        .save(function(err, obj) {
            if (err)
                return res.send(500);
            res.json(obj);
        });
});

user.post('/login', function(req, res) {
     var username = req.body.username,
         password = User.generateHash(req.body.password);

    User.findOne({username: username}, function(err, user) {
        if (user && user.password == password)
            res.send(user);
        else
            res.send(500);
    }, function(err) {
        res.send(500);
    });
});

user.get('/me', authenticatedMiddleware, function(req, res) {
   res.json(req.user);
});

module.exports = user;
