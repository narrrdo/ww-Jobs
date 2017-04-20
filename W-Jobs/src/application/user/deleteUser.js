'use strict'

var mongoose = require('mongoose');
var User = require('../../domain/users');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		User.findById(id, function(error, user){

			if(error) reject(error);
			
			if(!user) reject(new ConflictException());

			User.findByIdAndRemove(user._doc._id, function (err, resp) {
				
				if(err) reject(new ConflictException());

				resolve();
			});
		});
	});

	return resp;
}

module.exports = _module;