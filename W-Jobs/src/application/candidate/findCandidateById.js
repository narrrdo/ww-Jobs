'use strict'

var mongoose = require('mongoose');
var Candidate = require('../../domain/candidate');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Candidate.findById(id, {'resume.file' : 0}).exec(function(error, doc){

			if(error) reject(error);

			var resume = doc.resume;

			var res = {};
			res.name = doc.name;
			res.lastName = doc.lastName;
			res.email = doc.email;
			res.tel = doc.tel;
			res.hasResume = resume.text.length > 0;
				
			resolve(res);
		});
	});

	return resp;
}

module.exports = _module;