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
	try {
		await Comment.validate(req.body);
	} catch (error) {
		res.status(400);
		throw new Error(error);
	}

	const comment = await Comment.create(req.body);

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
