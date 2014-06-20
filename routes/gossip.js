var express = require('express'),
    models = require('../models'),
    Gossip = models.Gossip;

var gossip = express.Router();

gossip.get('/', function(req, res) {
    Gossip.find({}, function(err, gossips) {
        var list = {};
        gossips.forEach(function(gossip) {
            list[gossip._id] = gossip;
        });
        res.json(list);
    }, function(err) {
        res.send(500);
    });
});

gossip.post('/', function(req, res) {
    new Gossip({
        _creator: 'current_user',
        text: req.params.text,
        favorites: null,
        favoriteCount: 0,
        rewouths: null,
        rewouthCount: 0,
        created_at: Date.now(),
        updated_at: Date.now()
    }).save(function(err, obj) {
        if (err)
            return res.send(500);

        return res.json(obj);
    });
});

module.exports = gossip;
