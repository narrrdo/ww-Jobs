'use strict'

var mongoose = require('mongoose');
var Jobs = require('../../domain/jobs');
var Candidate = require('../../domain/candidate');
var ConflictException = require('../../common/exception/conflictException');
var pdfToText = require('../../common/converters/pdfToText');

var _module = {};

_module.execute = function(candidate, file){

  var resp = new Promise(function(resolve, reject){

  var p = (file) ? pdfToText.convert(file.buffer) : Promise.resolve();
  
  p.then(function(resumeText) {

    if(resumeText) {
      
      candidate.resume = {};
      candidate.resume.file = file.buffer;
      candidate.resume.text = resumeText;
    }
      
    return Candidate.create(candidate);

  }).then(function(doc) {

    var where = {_id : candidate.jobId};
    var set = {$push: {'candidates' : doc._id} };

    return Jobs.update(where, set);
      
  }).then(function(resp) {
  
    resolve(resp);

  }).catch(function(error) {

    reject(new ConflictException(error.message));

  });
});
  
  return resp;
}

module.exports = _module;