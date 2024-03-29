const path = require('path');
const express = require('express');
const cron = require('node-cron');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { connectDB, restoreDefaultData } = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const port = process.env.PORT || 5000;

connectDB();
restoreDefaultData();
// reset changes made by others to the live website of the project daily at midnight
cron.schedule('0 0 * * *', restoreDefaultData);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors()); // TODO check if cors implementation is necessery when its deployed on railway and if so add origin: <api-url>

app.use('/api/comments', require('./routes/commentRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Serve frontend
if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '../frontend/build')));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')));
} else {
	app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
