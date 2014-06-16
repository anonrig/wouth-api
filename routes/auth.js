var express = require('express'),
    passport = require('passport'),
    User = require('wouth/models/User');

var auth = express.Router();

auth.post(
    '/local',
    passport.authenticate('local'),
    function(req, res) {
        res.send(200);
    }
);

module.exports = auth;
