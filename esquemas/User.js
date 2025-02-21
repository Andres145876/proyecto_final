const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nameU: { type: String, required: true },
    emailU: { type: String, required: true, unique: true },
    passu: { type: String, required: true }
});

module.exports = mongoose.model('User', UserSchema);
