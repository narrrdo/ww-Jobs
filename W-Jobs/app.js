'use strict'

var path = require('path');
var express = require('express');
var i18n = require("i18n");
var bodyParser = require('body-parser');
var route = require('./src/rest-api/route')
var auth = require("./src/rest-api/security/auth")();  

var app = express();

i18n.configure({ locales:['en', 'es'], directory: __dirname + '/src/common/locales'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(auth.initialize());
app.use(express.static(path.join(__dirname, 'presentation')));
app.use(route);


module.exports = app;