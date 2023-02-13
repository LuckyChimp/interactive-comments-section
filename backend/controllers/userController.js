const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');

// @desc    Get users
// @route   GET /api/users
// @access  Public
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find();

	res.status(200).json(users);
});

// @desc    Get user
// @route   GET /api/users/:id
// @access  Public
const getUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) {
		res.status(400);
		throw new Error('User not found');
	}

	res.status(200).json(user);
});

module.exports = {
	getUsers,
	getUser
};
