'use strict'

var mongoose = require('mongoose');
var _ = require('underscore');
var i18n = require("i18n");
var Permission = require('../../domain/permissions');

var _module = {};

_module.execute = function(){

	var resp = new Promise(function(resolve, reject){

		Permission.find().sort({name : 1}).exec(function(error, permissions){

			if(error) reject(error);

			resolve(permissions);
		});
	});

	return resp;
}

module.exports = _module;