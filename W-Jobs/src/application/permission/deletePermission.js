'use strict'

var mongoose = require('mongoose');
var Permission = require('../../domain/permissions');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Permission.findById(id, function(error, perm){

			if(error) reject(error);
			
			if(!perm) return reject(new ConflictException());

			Permission.findByIdAndRemove(perm._doc._id, function (err, resp) {
				
				if(err) reject(new ConflictException());

				resolve();
			});
		});
	});

	return resp;
}

module.exports = _module;