const express = require("express");
const app = express();

// Create a variable named "MONGODB_URI" in a ".env" file with your MongoDB connection string.
require('dotenv').config();

const connection = require('./database/connection');
//Connect to Database 
connection();

const cors = require('cors');
const logger = require('morgan');

const users = require('./routes/users');
const events = require('./routes/events');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(cors());

app.use('/users', users);
app.use('/events', events);

app.listen(8080, () => {
	console.log("Server started on port 8080");
});