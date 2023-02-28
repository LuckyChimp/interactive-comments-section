const mongoose = require('mongoose');
const Comment = require('../models/commentModel');
const User = require('../models/userModel');

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
	const { spawn } = require('child_process');
	const restoreCollection = (collectionName) => {
		const restoreProcess = spawn('mongoimport', [
			`--uri="${process.env.MONGO_URI}"`,
			`--collection=${collectionName}`,
			`--file=./.mongodb/default-data/${collectionName}.json`,
			'--jsonArray'
		]);

		restoreProcess.on('exit', (code, signal) => {
			const now = new Date().toLocaleString('de-DE', { dateStyle: 'short', timeStyle: 'medium' });
			if (code)
				console.log(
					`[${now}] MongoDB restore process of ${String(collectionName).italic} data exited with code ${code}`.red
				);
			else if (signal)
				console.error(
					`[${now}] MongoDB restore process of ${String(collectionName).italic} data was killed with singal ${signal}`
						.red
				);
			else console.log(`[${now}] MongoDB restore process of ${String(collectionName).italic} data successfull`.cyan);
		});
	};

	// first delete all comment data and then restore the default comment data
	await Comment.deleteMany({});
	restoreCollection('comments');

	// first delete all user data and then restore the default user data
	await User.deleteMany({});
	restoreCollection('users');
};

module.exports = {
	connectDB,
	restoreDefaultData
};
