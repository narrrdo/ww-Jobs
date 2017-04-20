'use strict'

var mongoose = require('mongoose');
var Candidate = require('../../domain/candidate');
var ConflictException = require('../../common/exception/conflictException');

var _module = {};

_module.execute = function(candidate){

  var resp = new Promise(function(resolve, reject){

    Candidate.create(candidate).then(function(candidate){

      resolve(candidate);
      
    }).catch(function(error){

      reject(new ConflictException(error.message));
    });
  });
  
  return resp;
}

module.exports = _module;