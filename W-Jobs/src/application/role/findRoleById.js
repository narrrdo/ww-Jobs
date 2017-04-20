'use strict'

var mongoose = require('mongoose');
var Role = require('../../domain/roles');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Role.findById(id).populate('permissions').exec(function(error, doc){

			if(error) reject(error);

			resolve(doc);
		});
	});

	return resp;
}

module.exports = _module;