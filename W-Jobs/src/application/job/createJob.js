'use strict'

var mongoose = require('mongoose');
var Jobs = require('../../domain/jobs');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(job){

  var resp = new Promise(function(resolve, reject){

    Jobs.create(job).then(function(job){

      resolve(job);
      
    }).catch(function(error){

      reject(new ConflictException(error.message));
    });
  });
  
  return resp;
}

module.exports = _module;