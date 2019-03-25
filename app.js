'use strict';

// Check if domain is valid
function approveDomain(opts, certs, cb) {

  opts.email = 'flashpassedu@gmail.com';
  opts.agreeTos = true;
  opts.domains = [ 'www.flashpassedu.com', 'flashpassedu.com' ];

  cb(null, { options: opts, certs: certs });
}

var greenlock = require('greenlock-express').create({

  // Let's Encrypt v2 is ACME draft 11
  version: 'draft-11'

, server: 'https://acme-v02.api.letsencrypt.org/directory'

, approveDomains: function (opts, certs, cb) {
  // Check if domain is valid
  approveDomain(opts, certs, cb);
}
  // Where certs are stored
, configDir: 'C:/Users/Ben/acme'
  
  // Setup the server
, app: function (req, res) {
  require('./server.js')(req, res);
}


});

// Run the server
var server = greenlock.listen(80, 443);