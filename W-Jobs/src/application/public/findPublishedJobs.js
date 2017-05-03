'use strict'

var mongoose = require('mongoose');
var Job = require('../../domain/jobs');

var _module = {};

_module.execute = function(){

	var resp = new Promise(function(resolve, reject){

		var query = {published : true, isOpen : true};
		var sort = {publishedDate : 'asc'};

		Job.find(query).sort(sort).exec(function(error, jobs){

			if(error) reject(error);
			
			console.log(error)

			resolve(jobs);

			console.log(jobs)
		});
	});

	return resp;
}

module.exports = _module;