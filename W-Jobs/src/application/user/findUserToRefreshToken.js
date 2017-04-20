'use strict'

var mongoose = require('mongoose');
var _ = require('underscore');
var User = require('../../domain/users');
var NotFoundException = require('../../common/exception/notFoundException');

var _module = {};

_module.execute = function(id){
 
	var resp = new Promise(function(resolve, reject){

		User.findById(id, function(error, user){

			if(error) reject(error);
			
			if(!user) reject(new NotFoundException());

			resolve(user);
		});
 });

 return resp;
}

module.exports = _module;