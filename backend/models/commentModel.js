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
			// this field is only required, if 'replyingTo' doesnt exists
			required: function () {
				return !this.replyingTo;
			},
			default: undefined
		},
		replyingTo: {
			type: mongoose.Schema.Types.ObjectId,
			// this field is only required, if 'replies' doesnt exists
			required: function () {
				return !this.replies;
			},
			ref: 'Comment'
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Comment', commentSchema);
