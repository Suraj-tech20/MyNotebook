const mongoose = require('mongoose');
const { Schema } = mongoose;
const UserModel = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    emailToken: {
        type: String,
    },
    expireToken: {
        type: Date
    },
    isVerified: {
        type: Boolean,
    },
    password: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', UserModel);
module.exports = User;