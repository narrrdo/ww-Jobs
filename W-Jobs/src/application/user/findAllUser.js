'use strict'

var mongoose = require('mongoose');
var User = require('../../domain/users');

var _module = {};

_module.execute = function(){

	var resp = new Promise(function(resolve, reject){

		User.find().sort({username: 1}).exec(function(error, users){

			if(error) reject(error);
		
			resolve(users)
		});
	});

	return resp;
}

module.exports = _module;