'use strict'

var mongoose = require('mongoose');
var Role = require('../../domain/roles');

var _module = {};

_module.execute = function(id, role){

	var resp = new Promise(function(resolve, reject){

		Role.findById(id).populate('permissions').exec(function(error, doc){

			if(error) reject(error);

			doc.name.es = role.name.es;
			doc.name.en = role.name.en;
			doc.description.es = role.description.es;
			doc.description.en = role.description.en;
			doc.enabled = role.enabled;
			doc.permissions = role.permissions;

			doc.save(function(error){

				if(error) reject(error);
			});

			resolve(doc);
		});
	});

	return resp;
}

module.exports = _module;