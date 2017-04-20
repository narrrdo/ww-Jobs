'use strict'

var mongoose = require('mongoose');
var Candidate = require('../../domain/candidate');

var _module = {};

_module.execute = function(){

	var resp = new Promise(function(resolve, reject){

		Candidate.find().sort({'name' : 'asc'}).exec(function(error, docs){

			if(error) reject(error);
			
			resolve(docs);
		});
	});

	return resp;
}

module.exports = _module;