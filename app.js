const fs = require('fs');
const express = require('express');
const app = express();
const program = require('commander');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const cookieSession = require('cookie-session');
const passport = require('passport');
const path = require('path');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const userSchema = require('./db/schemas/userSchema.js');
const passSchema = require('./db/schemas/passSchema.js');
const classSchema = require('./db/schemas/classSchema.js');
const orgSchema = require('./db/schemas/orgSchema.js');
const testObjects  = require('./db/mock/mockdb.js');
const crypto = require('crypto');
const { SitemapStream, streamToPromise } = require('sitemap');
const { createGzip } = require('zlib');
const User = mongoose.model('User', userSchema);
const Pass = mongoose.model('Pass', passSchema);
const Class = mongoose.model('Class', classSchema);
const Org = mongoose.model('Org', orgSchema);
const { execSync } = require('child_process');
const port = process.env.PORT || 8080;
var config;
let sitemap;


program
  .version('0.1.0')
  .option('-d, --dev', 'Use outside of production')
  .parse(process.argv);



if(app.get('env') == 'production') {

	// Connect to the database
	mongoose.connect('db.omnibadge.com', { useNewUrlParser: true });

	// Store the connection
	var db = mongoose.connection;

	// Check for connection errors
	db.on('error', console.error.bind(console, 'connection error:'));

	// Set the secret key for making cookies/tokens
	app.set('superSecret', config.secret);

}

// Set port number as a global variable in app
app.set('port', port);

// Let the app know that it is operating behind cloudflare
app.enable('trust proxy');

// Configure the cookie parameters, maxAge is the expiration time and keys is what you use to sign cookies/tokens
app.use(cookieSession({
	maxAge: 60 * 60 * 1000,
	keys: [ app.get('superSecret') ],
	httpOnly: false,
}));


if(app.get('env') == 'production') {
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
		if(req.user) {
			next();
		} else {
			res.redirect('/');
		}
	}

	// Check if the user is logged in
	function isUserAdmin(req, res, next) {
		if(req.user) {
			User.find({ });
			next();
		} else {
			res.redirect('/');
		}
	}

}

// Configure Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
// Use Body Parser to decode json
app.use(bodyParser.json());

// Use cookie parser to intercept cookies
app.use(cookieParser());

if(app.get('env') == 'production') {
	// Sanitize input
	app.use(mongoSanitize());
}

app.use(morgan(':date[iso]'));

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
app.use(express.static(__dirname + '/client/static'));

app.get('/sitemap.xml', function(req, res) {
	res.header('Content-Type', 'application/xml');
	res.header('Content-Encoding', 'gzip');
	// If it's cached, send it
	if (sitemap) {
	  res.send(sitemap);
	  return;
	}
	try {
		const smStream = new SitemapStream({ hostname: 'https://omnibadge.com/' })
		const pipeline = smStream.pipe(createGzip())

		smStream.write({ url: '/', priority: 0.8 })
		smStream.write({ url: '/about',  priority: 0.3 })
		smStream.write({ url: '/contact', priority: 0.3 })

		smStream.end()
	 
		// Cache the response
		streamToPromise(pipeline).then(sm => sitemap = sm)
		// Write the response
		pipeline.pipe(res).on('error', (e) => {throw e})
	} catch (e) {
		console.error(e)
		res.status(500).end()
	}
});

// Send homepage
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/client/static/Home/Home.html");
});

// Generate QR Code
app.get('/newqr/:id', passport.authenticate('google'), function(req, res) {
	// If the data is too long then end the request because long file names make the OS sad :(
	if(req.params.id.length > 240) {
		res.send('Too Long!');
		res.end();
	} else {
		// Render the QR Code to a file
		qrcode.toFile(__dirname + '/client/qrcodes/' + req.params.id + '.svg', req.params.id, function (err) {
			if(err) {
				throw err;
			} else {
				// Serve the File
				res.sendFile(__dirname  + '/client/qrcodes/' + req.params.id + '.svg', function (err) {
					if(err) {
						throw err;
					} else {
						// Delete the file
						fs.unlink(__dirname + '/client/qrcodes/' + req.params.id + '.svg', function (err) {
						  if(err) throw err;
						});
					}
				});
			}
		});
	}
});


if(app.get('env') == 'production') {
	// Main authentication path
	app.get('/auth', passport.authenticate('google', {
		scope: [ 'profile', 'email' ]
	}));
} else {
	// If the app is being run in development then give them the admin page
	app.get('/auth', function(req, res) {
		res.redirect('/admin');
	});
}

// This gets called when authentication completes
app.get('/auth/callback', passport.authenticate('google'), (req, res) => {
	User.findOne({ email: req.user._json.email }, function(err, user) {
		if(user) {
			if(user.role == 'student') {
				res.redirect('/');
			} else {
				res.redirect('/admin');
			}
		} else {
			User.create({ id: req.user.id, firstName: req.user.name.givenName, lastName: req.user.name.familyName, email: req.user._json.email, role: 'student'})
			res.redirect('/admin');
		}
	})
});

if(app.get('env') == 'production') {
	app.get('/newPass/:room', isUserAuthenticated, function(req, res) {
		/*let student = new User({ id: req.user.id, firstName: req.user.name.givenName, lastName: req.user.name.familyName, email: req.user._json.email, role: "Student" });
		let pass = new Pass({ startTime: new Date(), duration: 60000, expiration: new Date(new Date().getTime()+60000), origin: req.params.room, destination: "Bathroom", return: true, student: student });
		pass.save(function (err) {
		  if(err) throw err;
		});
		console.log(req.user);
		*/res.send("Thank you " + req.user.name.givenName + ", your pass has been recorded");
	});

	app.post('/students', isUserAuthenticated, (req, res) => {
		User.find({}, function (err, users) {
			res.json(users);
		})
	});

	app.post('/passes', isUserAuthenticated, (req, res) => {
		User.find({}, function (err, passes) {
			res.json(passes);
		})
	});

} else {

	app.post('/students', (req, res) => {
		res.json(testObjects.testUsers);
	});

	app.post('/passes', (req, res) => {
		res.json(testObjects.testPasses);
	});
}



if(app.get('env') == 'production') {

	app.get('/newOrg', isUserAuthenticated, (req, res) => {
		res.send('TODO');
	});

	// This is a protected path, as shown by the isUserAuthenticated function
	app.get('/admin', isUserAuthenticated, (req, res) => {
		res.sendFile(__dirname + '/client/Admin/Admin.html');
	});

	app.get('/admin.min.js', isUserAuthenticated, (req, res) => {
		res.sendFile(__dirname + '/client/Admin/admin.min.js');
	});

	app.get('/logout', isUserAuthenticated, (req, res) => {
		req.logout();
		res.redirect('/');
	});

} else {

	app.get('/admin', (req, res) => {
		res.sendFile(__dirname + '/client/admin/admin.html');
	});

	app.get('/admin.min.js', (req, res) => {
		res.sendFile(__dirname + '/client/admin/admin.min.js');
	});

	app.get('/logout', (req, res) => {
		res.redirect('/');
	});
}


app.get('/create', (req, res) => {
	res.sendFile(__dirname + '/client/static/create/create.html');
});

app.get('/about', (req, res) => {
	res.sendFile(__dirname + '/client/static/about/about.html');
});


// Handle 404
app.use(function(req, res) {
	res.status(404);
	res.sendFile(__dirname + '/client/static/404/404.html');
});


// Export app(the main server object), used for HTTPS(server.js)
module.exports = app;

if(require.main === module) {
	app.listen(port, function () {
		console.log('Listening on port ' + port);
	});
}
