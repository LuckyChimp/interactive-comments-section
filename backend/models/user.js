const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'The username is required']
    },
    image: {
        png: {
            type: String,
            required: [true, 'The png url path is required']
        },
        webp: {
            type: String
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
