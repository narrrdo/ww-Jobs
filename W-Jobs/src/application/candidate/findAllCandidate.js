'use strict'

var mongoose = require('mongoose');
var Candidate = require('../../domain/candidate');
var _ = require('underscore');

var _module = {};

_module.execute = function(queryParams) {

	var resp = new Promise(function(resolve, reject){

		var search = {};

		if(!_.isEmpty(queryParams)) {

			var s = JSON.parse(queryParams);

			var resume = !_.isEmpty(s.resume) ? s.resume.join(' '): '';
			var name = s.name || '';
			var email = s.email || '';

			var param = `${name} ${email} ${resume}`.trim();

			search = { $text: { $search: param, $caseSensitive: false }};
		}


		Candidate.find(search, {resume : 0}).sort({'name' : 'asc'}).exec(function(error, docs) {

			if(error) reject(error);
			
			resolve(docs);
		});
	});

	return resp;
}

module.exports = _module;