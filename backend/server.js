const express = require('express');
const { default: mongoose } = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const apiRoute = require('./routes/apiRoute');

const app = express();
const port = process.env.PORT || 5000;

// Connect to the database
mongoose
    .connect(process.env.DB)
    .then(() => console.log(`Database connected successfully`))
    .catch((err) => console.log(err));

// ??? Since mongoose's Promise is deprecated, we override it with Node's Promise
// ??? mongoose.Promise = global.Promise;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.log(err);
    next();
});

app.use('/api', apiRoute);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
