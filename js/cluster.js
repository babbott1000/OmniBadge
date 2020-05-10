const cluster = require('cluster');
const os = require('os');
const http = require('http');

if (cluster.isMaster) {
  var cores = require('os').cpus().length;
  console.log(cores + " CPU(s) found, forking process")
  for (var i = 0; i < cores; i += 1) {
     	cluster.fork();
		console.log("Forked process on cpu " + (i + 1));
  }

} else {
  require('./server.js');
}

cluster.on('exit', function(worker) {
  console.log("\x1b[31m%s\x1b[0m", 'Worker ' + worker.id + ' died!');
  cluster.fork();
});

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
    console.log('Process listening on ' + bind);
}

