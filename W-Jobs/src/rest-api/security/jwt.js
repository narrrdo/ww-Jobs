'use strict'

var jwt = require("jsonwebtoken");
var randtoken = require('rand-token');
var config = require('../../../config');
var UnAuthorizeException = require('../../common/exception/noAuthorizeException');

var _module = {};
var refreshTokenList = {};

_module.generateToken = function(user) {

	var token = jwt.sign(user, config.jwtSecret, { expiresIn: config.expirationTokenMinute });
	var refreshTokend = randtoken.uid(256);

	refreshTokenList[refreshTokend] = {id : user.id, createionTime : new Date()};

	var resp = {};
	resp.token = token;
	resp.refreshToken = refreshTokend;

	return resp;
}

_module.refreshToken = function(rt, service) {

	return new Promise(function(resolve, reject) {
		
		if(!(rt in refreshTokenList)) throw new UnAuthorizeException();

			var id = refreshTokenList[rt].id;

			service.execute(id).then(function(user) {

			var resp = _module.generateToken(user);

			resolve(resp);

			}).catch(function(error){

				return reject(new UnAuthorizeException());
			});
	});
}

module.exports = _module;