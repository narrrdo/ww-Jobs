'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var _ = require('underscore');
var User = require('../../domain/users');
var NoAuthorizeException = require('../../common/exception/noAuthorizeException');

var _module = {};

_module.execute = function(username, password){

	var resp = new Promise(function(resolve, reject){
		
		User.findOne({'username' : username}).deepPopulate('role.permissions').exec(function(error, user){

			if(error) reject(new NoAuthorizeException('Un error ocurrio en nuestro sistema. Por favor trate mas tarde'));
			
			if(!user) return reject(new NoAuthorizeException('User not found in our system'));

			var passworMath = bcrypt.compareSync(password, user._doc.password);

			if(!passworMath) return reject(new NoAuthorizeException('Password not match'));

			if(!user.enabled) return reject(new NoAuthorizeException('El usuario esta desabilitado'));

			if(!user.role.enabled) return reject(new NoAuthorizeException('El perfil esta desabilitado'));

			let permList = new Array();

			_.each(user.role.permissions, function(perm){

				if(perm.enabled) {

					permList.push(perm._id);
				}
			});
			
			let u = {};
			u.id = user._id;
			u.username = user.username;
			u.fullName = `${user.firstname} ${user.lastname}`;
			u.locale = user.locale;
			u.role = {};
			u.role.id = user.role._id;
			u.role.name = user.role.name;
			u.role.permissions = permList;

			return resolve(u);
		});
	});

	return resp;
}

module.exports = _module;