'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require('../../domain/users');

var _module = {};

_module.execute = function(id, user) {

  var resp = new Promise(function(resolve, reject){

		User.findById(id).exec(function(error, doc) {

			if(error) return reject(error);

			doc.name = user.name;
			doc.firstname = user.firstname;
			doc.lastname = user.lastname;
			doc.locale = user.locale;
			doc.email = user.email;
			doc.enabled = user.enabled;
			doc.role = user.role.id;

			if(user.password) {

				var salt = bcrypt.genSaltSync(10);
    		var hashPassword = bcrypt.hashSync(user.password, salt);
				
				doc.password = hashPassword;
			}

			doc.save(function(error){

				if(error) reject(error);

				resolve(doc);
			});

		});

	});

	return resp;
}

module.exports = _module;