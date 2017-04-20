'use strict'

var mongoose = require('mongoose');
var Jobs = require('../../domain/jobs');
var FindJobById = require('./findJobById');
var faceBook = require('../../infrastructure/facebook/fbApi');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		FindJobById.execute(id).then(function(job){

			faceBook.sendPost(job.description);

		}).then(function(){

			var where = {_id : id};
			var set = {$push: {'socialNetwork.facebook.postedDate' : new Date().toISOString()} };

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