var express = require('express');
var HTTP_STATUS = require('http-status');
var router = express.Router();
var auth = require("../security/auth")(); 
var ConflictException = require('../../common/exception/conflictException');
var Permission = require('../../common/constant/permission');
var FindAllUser = require('../../application/user/findAllUser');
var FindUserById = require('../../application/user/findUserById');
var CreateUser = require('../../application/user/createUser');
var DeleteUser = require('../../application/user/deleteUser');
var UpdateUser = require('../../application/user/updateUser');

router.get('/', auth.hasPermission(Permission.USER_GET_ALL), findAllUser);
router.get('/:id', auth.hasPermission(Permission.USER_GET_DETAILS), getUserById);
router.post('/', auth.hasPermission(Permission.USER_ADD), createUser);
router.put('/:id', auth.hasPermission(Permission.USER_UPDATE), updateUser);
router.delete('/:id', auth.hasPermission(Permission.USER_DELETE), deleteUser);


function findAllUser(req, res, next) {
	
	FindAllUser.execute().then(function(users) {
		
		res.json(users);

	}).catch(next);
};

function getUserById(req, res, next) {
	
  var id = req.params.id;

	FindUserById.execute(id).then(function(user) {
		
		res.json(user);

	}).catch(next);
};

function createUser(req, res, next) {

	CreateUser.execute(req.body).then(function(user) {
        
		res.json(user);

	}).catch(next);
};

function updateUser(req, res, next) {

    var id = req.params.id;

    UpdateUser.execute(id, req.body).then(function(user) {

        res.json(user);

    }).catch(function(error) {

			next();
		});
}

function deleteUser(req, res, next) {

  var id = req.params.id;

  DeleteUser.execute(id).then(function() {

    res.send(HTTP_STATUS.NO_CONTENT);

  }).catch(next);
};

module.exports = router;