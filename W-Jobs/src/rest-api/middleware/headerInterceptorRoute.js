'use strict'

var express = require('express');
var router = express.Router();
var i18n = require("i18n");


router.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*'); //http://localhost:8888', 'http://localhost:8078'
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
    
    var lang = req.headers["accept-language"];

    if(lang === "en" || lang === "es") {

        i18n.setLocale(lang);
    }

    next();
});

module.exports = router;