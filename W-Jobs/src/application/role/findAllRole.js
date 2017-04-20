'use strict'

var mongoose = require('mongoose');
var Role = require('../../domain/roles');

var _module = {};

_module.execute = function(){

	var resp = new Promise(function(resolve, reject){

		Role.find().sort({'name.en' : 'asc'}).exec(function(error, roles){

			if(error) reject(error);
			
			resolve(roles);
		});
	});

	return resp;
}

module.exports = _module;