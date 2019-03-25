const config = require('E:/config.js');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const qrcode = require('qrcode');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const cookieSession = require('cookie-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const port = 80;


// Connect to the database
//mongoose.connect(config.database, { useNewUrlParser: true });
// Set the secret key for making cookies/tokens
app.set('superSecret', config.secret);

// Configure the cookie parameters, maxAge is the expiration time and keys is what you use to sign cookies/tokens
app.use(cookieSession({
    maxAge: 60 * 1000,
    keys: [ app.get('superSecret') ]
}));

// Initialize passport
app.use(passport.initialize());
// Configure passport for persistant authentication
app.use(passport.session());

// Use this middleware function for OAuth
passport.use(new GoogleStrategy({
    clientID: config.oAuthClientID,
    clientSecret: config.oAuthClientSecret,
    callbackURL: config.oAuthCallbackURL
  }, function(accessToken, refreshToken, profile, cb) {
    cb(null, profile);
  }
));

// Encode the user
passport.serializeUser((user, done) => {
    done(null, user);
});

// Decode the user
passport.deserializeUser((user, done) => {
    done(null, user);
});

// Check if the user is logged in
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/');
    }
}

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
// Use Body Parser to decode json
app.use(bodyParser.json());

// Use cookie parser to intercept cookies
app.use(cookieParser());

// Sanitize input
app.use(mongoSanitize());

// Use Morgan to log HTTP requests
app.use(morgan('dev'));

// Middleware function to set headers
app.use(function(req, res, next) {
	res.set('X-XSS-Protection', '1; mode=block');
	res.set('X-Frame-Options', 'deny');
	res.set('X-Content-Type-Options', 'nosniff');
	res.set('Pragma', 'no-cache');
	res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
	next();
})

// Serve static assets
app.use(express.static(__dirname + '/client'));

// Send main page
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/client/index.html");
});

// Generate QR Code
app.get('/generateqrcode/:id', function(req, res) {
	// If the data is too long then end the request because windows doesn't like long file names
	if(req.params.id.length > 240) {
		res.send('Too Long!');
		res.end();
	} else {
		// Render the QR Code to a file
		qrcode.toFile(__dirname + '/client/qrcodes/' + req.params.id + '.svg', req.params.id, function (err) {
			if(err)
				throw err;
			else
				// Serve the File
				res.sendFile(__dirname  + '/client/qrcodes/' + req.params.id + '.svg', function (err) {
					if (err) {
						throw err;
					} else {
						// Delete the file
						fs.unlink(__dirname + '/client/qrcodes/' + req.params.id + '.svg', function (err) {
						  if (err) throw err;
						});
					}
				});
		});
	}
});

// Set the time cookie
app.get('/settime/:id', function(req, res) {
	res.cookie('timeLeft', req.params.id, { maxAge: 900000, httpOnly: true });
	res.send('good');
});

// Get the time cookie
app.get('/gettime', function(req, res) {
	res.json(req.cookies.timeLeft);
	res.end();
});

// Main authentication path
app.get('/auth', passport.authenticate('google', {
    scope: ['profile']
}));

// This gets called when authentication completes
app.get('/auth/callback', passport.authenticate('google'), (req, res) => {
    res.redirect('/admin');
})

// This is a protected path, as shown by the isUserAuthenticated function
app.get('/admin', isUserAuthenticated, (req, res) => {
	res.send('Hello ' + req.user.name.givenName + ', how are you doing today?');
})

// Export app(the main server object), used for HTTPS(app.js)
module.exports = app;

// If this is being run standalone, serve in this file
if (require.main === module) {
	app.listen(port);
	console.log("listening on port '" + port + "'");
}

