'use strict'

var mongoose = require('mongoose');
var Permissions = require('../../domain/permissions');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Permissions.findById(id).exec(function(error, doc){

			if(error) reject(error);

			resolve(doc);
		});
	});

	return resp;
}

module.exports = _module;