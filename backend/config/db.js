const mongoose = require('mongoose');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');
const { EJSON } = require('bson');

const connectDB = async () => {
	mongoose.set('strictQuery', false);

	try {
		const conn = await mongoose.connect(process.env.MONGO_URI);

		console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

const restoreDefaultData = async () => {
	const now = new Date().toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'medium' });

	// read comments data from default data file and convert it with EJSON module from extended JSON object to plain json object
	const commentsData = EJSON.deserialize(require('../../.mongodb/default-data/comments.json'));
	// delete all comment data in db and then restore the default comment data from the data file into the db
	await Comment.deleteMany({});
	await Comment.insertMany(commentsData);
	console.log(`[${now}] MongoDB restore process of ${'comments'.italic} data successfull`.cyan);

	// read users data from default data file and convert it with EJSON module from extended JSON object to plain json object
	const usersData = EJSON.deserialize(require('../../.mongodb/default-data/users.json'));
	// delete all user data existing in db and then push the default user data from the data file into the db
	await User.deleteMany({});
	await User.insertMany(usersData);
	console.log(`[${now}] MongoDB restore process of ${'users'.italic} data successfull`.cyan);
};

module.exports = {
	connectDB,
	restoreDefaultData
};
