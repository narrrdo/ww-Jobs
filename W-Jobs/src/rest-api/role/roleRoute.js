'use strict'

var express = require('express');
var router = express.Router();
var auth = require("../security/auth")(); 
var Permission = require('../../common/constant/permission');
var FindAllRoles = require('../../application/role/findAllRole');
var FindRoleById = require('../../application/role/findRoleById');
var CreateRole = require('../../application/role/createRole');
var UpdateRole = require('../../application/role/updateRole');
var DeleteRole = require('../../application/role/deleteRole')

router.get('/', auth.hasPermission(Permission.ROLE_GET_ALL), findAllRoles);
router.get('/:id', auth.hasPermission(Permission.ROLE_GET_DETAILS), findRoleById);
router.post('/', auth.hasPermission(Permission.ROLE_ADD), createRole);
router.put('/:id', auth.hasPermission(Permission.ROLE_UPDATE), updateRole);
router.delete('/:id', auth.hasPermission(Permission.ROLE_DELETE), deleteRole);


function findAllRoles(req, res, next) {
  
  FindAllRoles.execute().then(function(roles){

    res.json(roles);  

  }).catch(next);
}

function findRoleById(req, res, next) {
  
  var id = req.params.id;
    
  FindRoleById.execute(id).then(function(role){

    res.json(role);  

  }).catch(next);
}

function createRole(req, res, next){

  CreateRole.execute(req.body).then(function(role){

    res.json(role);

  }).catch(next);
}

function updateRole(req, res, next){

  var id = req.params.id;

  UpdateRole.execute(id, req.body).then(function(role){

    res.json(role);

  }).catch(next);
}

function deleteRole(req, res, next){

  var id = req.params.id;

  DeleteRole.execute(id).then(function(role){

    res.json(role);

  }).catch(next);
}


module.exports = router;