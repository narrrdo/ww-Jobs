'use strict'

var mongoose = require('mongoose');
var Role = require('../../domain/roles');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Role.findById(id, function(error, role){

			if(error) reject(error);
			
			if(!role) reject(new ConflictException());

			Role.findByIdAndRemove(role._doc._id, function (err, resp) {
				
				if(err) reject(new ConflictException());

				resolve();
			});
		});
	});

	return resp;
}

module.exports = _module;