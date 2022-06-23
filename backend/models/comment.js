const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema(
    {
        content: {
            type: String,
            required: [true, 'The content text of a comment is required']
        },
        score: {
            type: Number,
            default: 0
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        replies: {
            type: [mongoose.Schema.Types.ObjectId],
            ref: 'Comment'
        },
        replyingTo: {
            type: String
        }
    },
    { timestamps: true }
);

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;
