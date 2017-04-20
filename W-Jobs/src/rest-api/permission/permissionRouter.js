'use strict'

var express = require('express');
var router = express.Router();
var auth = require("../security/auth")(); 
var Permission = require('../../common/constant/permission');
var CreatePermission = require('../../application/permission/createPermission');
var FindAllPermission = require('../../application/permission/findAllPermission');
var FindPermissionById = require('../../application/permission/findPermissionById');
var UpdatePermission = require('../../application/permission/updatePermission');
var DeletePermission = require('../../application/permission/deletePermission');

router.get('/', auth.hasPermission(Permission.PERMISSION_GET_ALL), findAllPermission);
router.get('/:id', auth.hasPermission(Permission.PERMISSION_GET_DETAILS), findPermissionById);
router.post('/', auth.hasPermission(Permission.PERMISSION_ADD), createPermission);
router.put('/:id', auth.hasPermission(Permission.PERMISSION_UPDATE), updatePermission);
router.delete('/:id', auth.hasPermission(Permission.PERMISSION_DELETE), deletePermission);

function findAllPermission(req, res, next){

    FindAllPermission.execute().then(function(permissions) {

        res.json(permissions);

    }).catch(next);
}

function findPermissionById(req, res, next) {

    var id = req.params.id;

    FindPermissionById.execute(id).then(function(permission) {

        res.json(permission);

    }).catch(next);
}


function createPermission(req, res, next) {
  
    CreatePermission.execute(req.body).then(function(perm) {

        res.json(perm);

    }).catch(next);
}

function updatePermission(req, res, next) {

    var id = req.params.id;

    UpdatePermission.execute(id, req.body).then(function(permission) {

        res.json(permission);

    }).catch(next);
}

function deletePermission(req, res, next) {

    var id = req.params.id;

    DeletePermission.execute(id).then(function(permission) {

        res.json(permission);

    }).catch(next);
}

module.exports = router;