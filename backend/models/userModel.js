const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    image: {
        png: {
            type: String,
            required: true
        },
        webp: {
            type: String
        }
    }
});

module.exports = mongoose.model('User', userSchema);