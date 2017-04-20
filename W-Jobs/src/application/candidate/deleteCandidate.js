'use strict'

var mongoose = require('mongoose');
var Candidate = require('../../domain/candidate');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Candidate.findById(id, function(error, candidate){

			if(error) reject(error);
			
			if(!candidate) return reject(new ConflictException());

			Candidate.findByIdAndRemove(candidate._id, function (err, resp) {
				
				if(err) reject(new ConflictException());

				resolve(resp);
			});
		});
	});

	return resp;
}

module.exports = _module;