var models = require('./models');

var getWouths = function(req, res) {
    models.Gossip.find({}, function(err, gossips) {
        var list = {};
        gossips.forEach(function(gossip) {
            list[gossip._id] = gossip;
        });
        res.send(list);
    });
};

var postWouth = function(req, res) {
    new models.Wouth({
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
                return res.send(500, err);

            return res.send(obj);
        });
};

var getUsers = function(req, res) {
    models.User.find({}, function(err, users) {
        var list = {};
        users.forEach(function(user) {
            list[user._id] = user;
        });
        res.send(list);
    });
};

var postUser = function(req, res) {
    var password = models.User.generateHash(req.body.password);

    new models.User({
        username: req.body.username,
        image: req.body.image,
        email: req.body.email,
        password: password,
        reminder: null,
        following: null,
        followers: null,
        created_at: Date.now(),
        updated_at: Date.now()
    }).save(function(err, obj) {
            if (err)
                return res.send(500, err);

            return res.send(obj);
        });
};

module.exports = function(app) {
    app.get('/wouths', getWouths);
    app.post('/wouth', postWouth);
    app.get('/users', getUsers);
    app.post('/user', postUser);
};
