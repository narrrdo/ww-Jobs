'use strict'

var mongoose = require('mongoose');
var Permission = require('../../domain/permissions');

var _module = {};

_module.execute = function(id, role){

	var resp = new Promise(function(resolve, reject){

		Permission.findById(id).exec(function(error, doc){

			if(error) reject(error);
			
			doc.name = role.name;
			doc.description = role.description;
			doc.enabled = role.enabled;
			
			doc.save(function(error){

				if(error) reject(error);

				resolve(doc);
			});
		});
	});

	return resp;
}

module.exports = _module;