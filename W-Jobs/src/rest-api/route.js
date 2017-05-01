'use strict'

var express = require('express');
var router = express.Router();
var finallyRoute = require('./middleware/finallyRoute');
var indexRoute = require('./middleware/indexRoute');
var headerInterceptorRoute = require('./middleware/headerInterceptorRoute');

var constantsPermissions = require('./constants/permissionsRouter');

var user = require('./user/userRoute')
var role = require('./role/roleRoute')
var perm = require('./permission/permissionRouter')
var token = require('./security/tokenRoute');
var job = require('./jobs/jobRouter');
var candidate = require('./candidate/candidateRoute');
var publicAPIs = require('./public/publicRoute');


router.use(headerInterceptorRoute);
router.use(indexRoute);
router.use('/constantsPermissions', constantsPermissions);
router.use('/token', token);
router.use('/users', user);
router.use('/roles', role);
router.use('/permissions', perm);
router.use('/jobs', job);
router.use('/candidates', candidate);
router.use('/public', publicAPIs);
//router.use(finallyRoute);

router.use(function(err, req, res, next){
  
  res.status(err.status || 500);
  res.send({message: err.message});
});

module.exports = router;