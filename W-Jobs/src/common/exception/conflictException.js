'use strict';

module.exports = function ConflictException(message) {
  
	Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.status = 409;
};

require('util').inherits(module.exports, Error);