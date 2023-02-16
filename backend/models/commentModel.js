const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		},
		score: {
			type: Number,
			default: 0
		},
		replies: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: 'Comment',
			default: undefined
		},
		replyingTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Comment'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);

// TODO sorge dafür, dass entweder das field 'replies' oder 'replyingTo' angegeben wird - auch nicht beide zusammen!
