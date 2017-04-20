'use strict';

module.exports = function NoContentException(message) {
  
	Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.status = 204;
};

require('util').inherits(module.exports, Error);