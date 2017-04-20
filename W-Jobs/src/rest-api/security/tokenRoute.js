'use strict'

var express = require('express');
var router = express.Router();
var jwt = require('./jwt');
var cfg = require('../../../config');
var LogIn = require('../../application/user/login');
var FindUserByEmail = require('../../application/user/findUserByEmail');
var FindUserToRefreshToken = require('../../application/user/findUserToRefreshToken');


router.post("/", function(req, res, next) {  

	var username = req.body.username;
	var password = req.body.password;

    LogIn.execute(username, password).then(function(user) {

			var resp = jwt.generateToken(user);

			res.json(resp);

		}).catch(next);
});

router.post("/refresh", function(req, res, next) {  

	var refreshToken = req.body.refreshToken;

	jwt.refreshToken(refreshToken, FindUserToRefreshToken).then(function(token) {
		
		res.json(token);

	}).catch(next);

});

module.exports = router;