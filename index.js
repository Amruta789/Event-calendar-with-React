const express = require("express");
const app = express();

const connection = require('./database/connection');
//Connect to Database 
connection();

const cors = require('cors');
const logger = require('morgan');

const users = require('./routes/users');
const events = require('./routes/events');

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/users', users);
app.use('/events', events);

app.listen(8080, () => {
	console.log("Server started on port 8080");
});