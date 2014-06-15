var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    crypto = require('crypto');

var userSchema = new Schema({
    username:  String,
    image: String,
    email: String,
    password: String,
    reminder: { question: String, answer: String },
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});


userSchema.methods.validPassword = function(password) {
    return this.password == this.generateHash(password);
};


userSchema.statics.generateHash = function(string) {
    var sha256 = crypto.createHash("sha256");

    /**
     * Salt added in SHA-256 Hashing Algorithm: 'wouthappios'
     */
    sha256.update(string + "24e192152fb030eb5c88c215769cbdd0cb2b855db692e177fff99ff478a8fee1", "UTF-8");
    return sha256.digest("base64");
};


module.exports = mongoose.model('User', userSchema);
