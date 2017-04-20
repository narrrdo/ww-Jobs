'use strict'

var express = require('express');
var router = express.Router();


router.use(function(err, req, res, next){
  
  res.status(err.status || 500);
  res.send({message: err.message});
});

module.exports = router;