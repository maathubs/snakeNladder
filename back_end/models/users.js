var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    userId: Number,
    name: String,
    email: String,
    password: String,
    log:mongoose.Schema.Types.Mixed
});

module.exports = mongoose.model('user', userSchema);