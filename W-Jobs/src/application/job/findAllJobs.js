'use strict'

var mongoose = require('mongoose');
var Job = require('../../domain/jobs');

var _module = {};

_module.execute = function(){

	var resp = new Promise(function(resolve, reject){

		Job.find().sort({'title' : 'asc'}).exec(function(error, jobs){

			if(error) reject(error);
			
			resolve(jobs);
		});
	});

	return resp;
}

module.exports = _module;