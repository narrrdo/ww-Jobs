'use strict'

var mongoose = require('mongoose');
var Candidate = require('../../domain/candidate');
var ConflictException = require('../../common/exception/conflictException');
var pdfToText = require('../../common/converters/pdfToText');

var _module = {};

_module.execute = function(candidate, file){

  var resp = new Promise(function(resolve, reject){

  pdfToText.convert(file.buffer).then(function(resumeText){

    candidate.resume = {};
    candidate.resume.file = file.buffer;
    candidate.resume.text = resumeText;

    return Candidate.create(candidate);

  }).then(function(candidate){

    resolve(candidate);
      
  }).catch(function(error){

    reject(new ConflictException(error.message));
  });
});
  
  return resp;
}

module.exports = _module;