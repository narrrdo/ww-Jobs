'use strict';

module.exports = function NoAuthorizeException(message) {
  
	Error.captureStackTrace(this, this.constructor);
  this.name = this.constructor.name;
  this.message = message;
  this.status = 401;
};

require('util').inherits(module.exports, Error);