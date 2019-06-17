'use strict';

// Check if domain is valid
function approveDomain(opts, certs, cb) {

  opts.email = 'flashpassedu@gmail.com';
  opts.agreeTos = true;
  opts.subject = 'flashpassedu.com';
  opts.domains = [ opts.subject ,'*.flashpassedu.com' ];
  if (!opts.challenges) { opts.challenges = {}; }
  opts.challenges['dns-01'] = require('le-challenge-dns').create({});
  opts.account = { id: opts.email };
  opts.certificate = { id: opts.subject };

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
  require('./app.js')(req, res);
}

, store: require('le-store-fs')
});

// Run the server
var server = greenlock.listen(8080, 443);