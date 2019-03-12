const config = require('E:/config.js');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const port = 80;

mongoose.connect(config.database, { useNewUrlParser: true });
app.set('superSecret', config.secret);

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(morgan('dev'));

app.use('/', express.static(__dirname + '/client'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/client/index.html");
});

module.exports = app;

if (require.main === module) {
	app.listen(port);
	console.log("listening on port '" + port + "'");
}