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
const userSchema = require('./database/userSchema.js');
const passSchema = require('./database/passSchema.js');
const classSchema = require('./database/classSchema.js');
const orgSchema = require('./database/orgSchema.js');
const User = mongoose.model('User', userSchema);
const Pass = mongoose.model('Pass', passSchema);
const Class = mongoose.model('Class', classSchema);
const Org = mongoose.model('Org', orgSchema);

const port = 80;

// Connect to the database
mongoose.connect(config.database, { useNewUrlParser: true });

// Check the connection
var db = mongoose.connection;

// Log any connection errors
db.on('error', console.error.bind(console, 'connection error:'));

// Set the secret key for making cookies/tokens
app.set('superSecret', config.secret);

// Configure the cookie parameters, maxAge is the expiration time and keys is what you use to sign cookies/tokens
app.use(cookieSession({
    maxAge: 60 * 60 * 1000,
    keys: [ app.get('superSecret') ],
    httpOnly: false,
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
	console.log(user);
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

// Check if the user is logged in
function isUserAdmin(req, res, next) {
    if (req.user) {
    	User.find({ });
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
	res.sendFile(__dirname + "/client/Home/Home.html");
});

// Generate QR Code
app.get('/generateqrcode/:id', passport.authenticate('google'), function(req, res) {
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
/*app.get('/settime/:id', function(req, res) {
	res.cookie('timeLeft', req.params.id, { maxAge: 900000, httpOnly: true });
	res.send('good');
});
*/

app.get('/newPass/:room', isUserAuthenticated, function(req, res) {
	/*let student = new User({ id: req.user.id, firstName: req.user.name.givenName, lastName: req.user.name.familyName, email: req.user._json.email, role: "Student" });
	let pass = new Pass({ startTime: new Date(), duration: 60000, expiration: new Date(new Date().getTime()+60000), origin: req.params.room, destination: "Bathroom", return: true, student: student });
	pass.save(function (err) {
	  if (err) throw err;
	});
	console.log(req.user);
	*/res.send("Thank you " + req.user.name.givenName + ", your pass has been recorded");
})

// Main authentication path
app.get('/auth', passport.authenticate('google', {
    scope: [ 'profile', 'email' ]
}));

// This gets called when authentication completes
app.get('/auth/callback', passport.authenticate('google'), (req, res) => {
	User.findOne({ email: req.user._json.email }, function(err, user) {
		if(user) {
			if (user.role == 'student') {
				res.redirect('/');
			} else {
				res.redirect('/admin');
			}
		} else {
			User.create({ id: req.user.id, firstName: req.user.name.givenName, lastName: req.user.name.familyName, email: req.user._json.email, role: 'student'})
			res.redirect('/admin');
		}
	})
})


app.get('/newOrg', isUserAuthenticated, (req, res) => {
	res.send('TODO');
});

// This is a protected path, as shown by the isUserAuthenticated function
app.get('/admin', isUserAuthenticated, (req, res) => {
	res.send(__dirname + '/client/Admin/Admin.html');
});

app.get('/logout', isUserAuthenticated, (req, res) => {
	req.logout();
	res.redirect('/');
});


// If this is being run standalone, serve in this file
if (require.main === module) {
	app.listen(port);
	console.log("listening on port '" + port + "'");
} else {
	//Let Express Know it's operating behind a proxy
	app.enable('trust proxy')
}

// Export app(the main server object), used for HTTPS(app.js)
module.exports = app;