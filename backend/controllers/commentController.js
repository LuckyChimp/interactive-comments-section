const asyncHandler = require('express-async-handler');
const { globalAgent } = require('http');

const Comment = require('../models/commentModel');

// @desc    Get comments
// @route   GET /api/comments
// @access  Public
const getComments = asyncHandler(async (req, res) => {
	const comments = await Comment.find();

	res.status(200).json(comments);
});

// @desc    Get comment
// @route   GET /api/comments/:id
// @access  Public
const getComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.id);

	if (!comment) {
		res.status(400);
		throw new Error('Comment not found');
	}

	res.status(200).json(comment);
});

// @desc    Create comment
// @route   POST /api/comments
// @access  Public
const createComment = asyncHandler(async (req, res) => {
	// create comment itself
	try {
		await Comment.validate(req.body);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}

	const comment = await Comment.create(req.body);

	// if comment has the 'replyingTo' field add the comments id to the 'replies' field of the parent comment
	if (comment.replyingTo) {
		const refComment = await Comment.findById(comment.replyingTo);
		if (!refComment) {
			res.status(400);
			throw new Error('Comment to which you want to reply was not found');
		}

		if (refComment.replyingTo) {
			// if the referenced comment of the reply is a reply itself (hasn't the 'replies' field) search for the id of the referenced comment in 'replies' field of all existing comments and add the comment id to the 'replies' field of the resulting parent comment
			await Comment.updateMany({ replies: { $in: [comment.replyingTo] } }, { $push: { replies: comment._id } });
		} else {
			// if the referenced comment of the reply is a parent component (hasn't the 'replyingTo' field) add comments id to it
			await Comment.findByIdAndUpdate(comment.replyingTo, { $push: { replies: comment._id } });
		}
	}

	res.status(200).json(comment);
});

// @desc    Update comment
// @route   PUT /api/comments/:id
// @access  Public
const updateComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.id);

	if (!comment) {
		res.status(400);
		throw new Error('Comment not found');
	}

	const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });

	res.status(200).json(updatedComment);
});

// @desc    Delete comment
// @route   DELETE /api/comments/:id
// @access  Public
const deleteComment = asyncHandler(async (req, res) => {
	const comment = await Comment.findById(req.params.id);

	if (!comment) {
		res.status(400);
		throw new Error('Comment not found');
	}

	// delete comment itself if it exists
	await comment.deleteOne();

	// delete all replies of this comment if they exist
	if (comment.replies) {
		await Comment.deleteMany({ _id: { $in: comment.replies } });
	}

	// delete all references of this comment in replies field of other comments
	await Comment.updateMany({ replies: comment._id }, { $pull: { replies: comment._id } });

	res.status(200).json({ id: comment._id });
});

module.exports = {
	getComments,
	getComment,
	createComment,
	updateComment,
	deleteComment
};
