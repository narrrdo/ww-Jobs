'use strict'

var mongoose = require('mongoose');
var Role = require('../../domain/roles');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(role) {

  var resp = new Promise(function(resolve, reject) {

    Role.create(role).then(function(role){

      resolve(role);
      
    }).catch(function(error) {

      reject(new ConflictException(error.message));
    });
  });
    
  return resp;
}

module.exports = _module;