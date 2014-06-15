var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var gossipSchema = new Schema({
    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    text: String,
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    favoriteCount: Number,
    rewouths: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Gossip' }],
    rewouthCount: Number,
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gossip', gossipSchema);
