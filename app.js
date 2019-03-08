'use strict';

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
  // Note: If at first you don't succeed, stop and switch to staging
  // https://acme-staging-v02.api.letsencrypt.org/directory

//[ 'flashpassedu.com', 'www.flashpassedu.com' ]
, approveDomains: function (opts, certs, cb) {
  approveDomain(opts, certs, cb);
}

, configDir: 'C:/Users/Ben/acme'

, app: function (req, res) {
  require('./server.js')(req, res);
}


});

var server = greenlock.listen(80, 443);