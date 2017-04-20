'use strict'

var debug = require('debug')('rest-server:server');
var mongoose = require('mongoose') 
var bluebird = require('bluebird');
var http = require('http');
var https = require('https');
var app = require('./app');
var config = require('./config');

builMongoConection();

var port = normalizePort(process.env.PORT || '3000');

app.set('port', port);

var server = http.createServer(app);

server.listen(port, function() {
  console.log('Server listening on port ',port);
});

server.on('error', onError);
server.on('uncaughtException', unCaughtException);
process.on('unhandledRejection', unHandledRejection);
server.on('listening', onListening);





// Functions

function normalizePort(val) {
  
  var port = parseInt(val, 10);
  
  if (isNaN(port)) {  
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;

    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;

    default:
      throw error;
  }
}

function unCaughtException(e){

  console.error(e);
  process.exit(1);
}

function unHandledRejection(reason, promise){

  console.error('Unhandled rejection', {reason: reason, promise: promise})
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

function builMongoConection(){

  mongoose.Promise = bluebird;
  mongoose.connect(config.mongoUrl);
  mongoose.set('debug', true);

  var db = mongoose.connection;
  
  db.on('error', console.error.bind(console, 'connection error:'));

  db.once('open', function () {
      console.log("Connected correctly to Mongo server");
  });
}