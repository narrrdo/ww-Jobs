'use strict'

var mongoose = require('mongoose');
var Job = require('../../domain/jobs');

var _module = {};

_module.execute = function(){

	var resp = new Promise(function(resolve, reject){

		var query = {isOpen : true};
		var sort = {createdAt : 'asc'};

		Job.find(query).sort(sort).exec(function(error, jobs){

			if(error) reject(error);
			
			resolve(jobs);
		});
	});

	return resp;
}

module.exports = _module;