'use strict'

var express = require('express');
var router = express.Router();
var permissionConstants = require('../../common/constant/permission');


router.get('/', exportPermissionsConstants);


function exportPermissionsConstants(req, res, next) {

	res.json(permissionConstants);   
}

module.exports = router;