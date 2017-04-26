'use strict'

var mongoose = require('mongoose');
var Jobs = require('../../domain/jobs');
var FindJobById = require('./findJobById');
var LinkedIn = require('../../infrastructure/linkedin/linkedinService');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		FindJobById.execute(id).then(function(job){

			LinkedIn.post(job.description);

		}).then(function(){

			var postedDate = {postedDate : new Date().toISOString()};
			var where = {_id : id};
			var set = {$push: {'socialNetwork.linkedin' :  postedDate} };

			return Jobs.update(where, set);

		}).then(function(resp){

			resolve(resp);

		}).catch(function(error){

			reject(error);
		});
	});

	return resp;
}

module.exports = _module;