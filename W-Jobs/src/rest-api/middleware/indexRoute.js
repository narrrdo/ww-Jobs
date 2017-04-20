'use strict'

var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
  
    res.end("Welcome to W-Jobs");  
});

module.exports = router;