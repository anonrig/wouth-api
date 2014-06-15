var express = require('express'),
    models = require('../models'),
    User = models.User;

var user = express.Router();

user.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if (err)
            return res.send(500, err);
        res.send(users);
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
                return res.send(500, err);
            res.send(obj);
        });
});

module.exports = user;
