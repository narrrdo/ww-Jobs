'use strict'

var express = require('express');
var router = express.Router();
var auth = require("../security/auth")(); 
var multer  = require('multer')
var FindPublishedJobs = require('../../application/public/findPublishedJobs');
var FindPublishedJobDetail = require('../../application/public/findPublishedJobDetail');
var Apply = require('../../application/public/apply');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.get('/jobs/published', findPublishedJobs);
router.get('/jobs/published/:id', findPublishedJobDetail);
router.post('/jobs/apply', upload.single('file'), apply);


function findPublishedJobs(req, res, next) {
  
  FindPublishedJobs.execute().then(function(jobs){

    res.json(jobs);  

  }).catch(next);
}

function findPublishedJobDetail(req, res, next) {
  
  var id = req.params.id;
    
  FindPublishedJobDetail.execute(id).then(function(job){

    res.json(job);  

  }).catch(next);
}

function apply(req, res, next) {
  
  var file = req.file;

  Apply.execute(req.body, file).then(function(doc) {

    res.json(doc);

  }).catch(next);
}


module.exports = router;