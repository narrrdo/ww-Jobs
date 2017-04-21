'use strict'

var mongoose = require('mongoose');
var Candidate = require('../../domain/candidate');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Candidate.findById(id, {'resume.file' : 1}).exec(function(error, doc){

			if(error) reject(error);

			var res = doc.resume.file;
			
			resolve(res);
		});
	});

	return resp;
}

module.exports = _module;