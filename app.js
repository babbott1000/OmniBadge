const express = require('express');
const app = express();

const port = 80;

app.use('/', express.static(__dirname + '/client'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/client/index.html");
});

app.listen(port);