'use strict'

var mongoose = require('mongoose');
var Jobs = require('../../domain/jobs');

var _module = {};

_module.execute = function(id){

	var resp = new Promise(function(resolve, reject){

		Jobs.findById(id).exec(function(error, doc){

			if(error) reject(error);

			resolve(doc);
		});
	});

	return resp;
}

module.exports = _module;