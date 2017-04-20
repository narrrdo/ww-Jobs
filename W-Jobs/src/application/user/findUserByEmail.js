'use strict'

var mongoose = require('mongoose');
var User = require('../../domain/users');
var NoContentException = require('../../common/exception/noContentException');

var _module = {};

_module.execute = function(email){

	var resp = new Promise(function(resolve, reject){

		User.findOne({'email' : email}, function(error, user){

			if(error) reject(error);
			
			if(!user) reject(new NoContentException());

			resolve(user);
		});
	});

	return resp;
}

module.exports = _module;