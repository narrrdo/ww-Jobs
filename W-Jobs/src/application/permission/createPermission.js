'use strict'

var mongoose = require('mongoose');
var Permission = require('../../domain/permissions');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(permission){

  var resp = new Promise(function(resolve, reject){

    Permission.create(permission).then(function(permission){

      resolve(permission);
      
    }).catch(function(error){

      reject(new ConflictException(error.message));
    });
  });
  
  return resp;
}

module.exports = _module;