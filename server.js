const config = require('E:/config.js');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode');

const port = 80;

mongoose.connect(config.database, { useNewUrlParser: true });
app.set('superSecret', config.secret);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(mongoSanitize());

app.use(morgan('dev'));

app.use(function(req, res, next) {
	res.set('X-XSS-Protection', '1; mode=block');
	res.set('X-Frame-Options', 'deny');
	res.set('X-Content-Type-Options', 'nosniff');
	res.set('Pragma', 'no-cache');
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	next();
})

app.use(express.static(__dirname + '/client'));

app.get('/', function(req, res) {
	res.sendFile(__dirname + "/client/index.html");
});

app.get('/generateqrcode/:id', function (req, res) {
	if(req.params.id.length > 240) {
		res.send('Too Long!');
		res.end();
	} else {	
		qrcode.toFile(__dirname + '/client/qrcodes/' + req.params.id + '.svg', req.params.id, function (err) {
			if(err)
				throw err;
			else
				res.sendFile(__dirname  + '/client/qrcodes/' + req.params.id + '.svg', function (err) {
					if (err) {
						throw err;
					} else {
						fs.unlink(__dirname + '/client/qrcodes/' + req.params.id + '.svg', function (err) {
						  if (err) throw err;
						});
					}
				});
		});
	}
});

module.exports = app;

if (require.main === module) {
	app.listen(port);
	console.log("listening on port '" + port + "'");
}

