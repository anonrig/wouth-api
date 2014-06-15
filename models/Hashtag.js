var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var hashtagSchema = new Schema({
    name: String,
    list: [{type: mongoose.Schema.Types.ObjectId, ref: 'Gossip'}],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Hashtag', hashtagSchema);
