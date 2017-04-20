'use strict'

var mongoose = require('mongoose');
var Jobs = require('../../domain/jobs');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Jobs.findById(id, function(error, job){

			if(error) reject(error);
			
			if(!job) return reject(new ConflictException());

			Jobs.findByIdAndRemove(job._doc._id, function (err, resp) {
				
				if(err) reject(new ConflictException());

				resolve();
			});
		});
	});

	return resp;
}

module.exports = _module;