const fs = require('fs');
const express = require('express');
const app = express();
const program = require('commander');
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
const crypto = require('crypto');
const sm = require('sitemap');
const User = mongoose.model('User', userSchema);
const Pass = mongoose.model('Pass', passSchema);
const Class = mongoose.model('Class', classSchema);
const Org = mongoose.model('Org', orgSchema);
const { execSync } = require('child_process');

program
  .version('0.1.0')
  .option('-d, --dev', 'Don\'t load config or connect to DB')
  .parse(process.argv);


const port = 8080;

if (!program.dev) {
	const config = require('E:/config.js');

	// Connect to the database
	mongoose.connect(config.database, { useNewUrlParser: true });

	// Check the connection
	var db = mongoose.connection;

	// Log any connection errors
	db.on('error', console.error.bind(console, 'connection error:'));

	// Set the secret key for making cookies/tokens
	app.set('superSecret', config.secret);

}

// Set port number as a global variable in app
app.set('port', port);

app.enable('trust proxy')

var sitemap = sm.createSitemap ({
  hostname: 'http://flashpassedu.com',
  cacheTime: 600000,        // 600 sec - cache purge period
  urls: [
    { url: '/' },
  ]
});	

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

if (!program.dev) {

	// Use this middleware function for OAuth
	passport.use(new GoogleStrategy({
	    clientID: config.oAuthClientID,
	    clientSecret: config.oAuthClientSecret,
	    callbackURL: config.oAuthCallbackURL
	  }, function(accessToken, refreshToken, profile, cb) {
	    cb(null, profile);
	  }
	));

}

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

if (!program.dev) {
	app.post('/deploy', (req, res) => {
		
		let hmac = crypto.createHmac('sha1', config.webhookSecret);
		let result = hmac.update(JSON.stringify(req.body)).digest('hex');

		if(('sha1=' + result) == req.get('x-hub-signature')) {
			if(req.body.ref == 'refs/heads/deploy') {
				console.log('\x1b[35m%s\x1b[0m', 'New Version Detected, Pulling');
				execSync('start cmd /k \"' + __dirname + '\\restart.bat\"');
			} else {
				console.log('\x1b[36m%s\x1b[0m', 'Detected Push not on Deploy Branch');
			}
			res.status(200);
			res.end();
		} else {
			res.status(404);
			res.end();
		}
	});
}

app.get('/sitemap.xml', function(req, res) {
  sitemap.toXML( function (err, xml) {
      if (err) {
        return res.status(500).end();
      }
      res.header('Content-Type', 'application/xml');
      res.send( xml );
  });
});

// Send main page
app.get('/', function(req, res) {
	res.sendFile(__dirname + "/client/static/Home/Home.html");
});

// Generate QR Code
app.get('/newqr/:id', passport.authenticate('google'), function(req, res) {
	// If the data is too long then end the request because windows doesn't like long file names
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
					if (err) {
						throw err;
					} else {
						// Delete the file
						fs.unlink(__dirname + '/client/qrcodes/' + req.params.id + '.svg', function (err) {
						  if (err) throw err;
						});
					}
				});
			}
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
});

app.get('/create', (req, res) => {
	res.sendFile(__dirname + '/client/static/Create/Create.html');
});

app.get('/pass', (req, res) => {
	res.sendFile(__dirname + '/client/static/Pass/Pass.html');
});

app.post('/students', isUserAuthenticated, (req, res) => {
	User.find({}, function (err, users) {
		res.json(users);
	})
});

app.post('/passes', isUserAuthenticated, (req, res) => {
	User.find({}, function (err, users) {
		res.json(users);
	})
});


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

// Handle 404
app.use(function(req, res) {
	res.status(404).send('404: Page not Found');
});


// Export app(the main server object), used for HTTPS(server.js)
module.exports = app;

if(require.main === module) {
	app.listen(port, function () {
		console.log('Listening on port ' + port);
	});
}