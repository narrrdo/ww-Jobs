'use strict'

var express = require('express');
var router = express.Router();
var httpStatus = require('http-status');
var auth = require("../security/auth")(); 
var Permission = require('../../common/constant/permission');
var FindAllJob = require('../../application/job/findAllJobs');
var FindJobById = require('../../application/job/findJobById');
var CreateJob = require('../../application/job/createJob');
var UpdateJob = require('../../application/job/updateJob');
var DeleteJob = require('../../application/job/deleteJob');
var SendJobToFaceBook = require('../../application/job/sendJobToFaceBook');
var SendJobToLinkedIn = require('../../application/job/sendJobToLinkedIn');


router.get('/', auth.hasPermission(Permission.JOB_GET_ALL), findAllJob);
router.get('/:id', auth.hasPermission(Permission.JOB_GET_DETAILS), findJobById);
router.post('/', auth.hasPermission(Permission.JOB_ADD), createJob);
router.post('/:id/facebook', sendJobToFaceBook);
router.post('/:id/linkedin', sendJobToLinkedIn);
router.put('/:id', auth.hasPermission(Permission.JOB_UPDATE), updateJob);
router.delete('/:id', auth.hasPermission(Permission.JOB_DELETE), deleteJob);

function findAllJob(req, res, next) {

    FindAllJob.execute().then(function(jobs) {

        res.json(jobs);

    }).catch(next);
}

function findJobById(req, res, next) {

    var id = req.params.id;

    FindJobById.execute(id).then(function(job) {

        res.json(job);

    }).catch(next);
}


function createJob(req, res, next) {
  
    CreateJob.execute(req.body).then(function(job) {

        res.json(job);

    }).catch(next);
}

function updateJob(req, res, next) {

    var id = req.params.id;

    UpdateJob.execute(id, req.body).then(function(job) {

        res.json(job);

    }).catch(next);
}

function deleteJob(req, res, next) {

    var id = req.params.id;

    DeleteJob.execute(id).then(function(job) {

        res.json(job);

    }).catch(next);
}

function sendJobToFaceBook(req, res, next) {

  var id = req.params.id;

  SendJobToFaceBook.execute(id).then(function() {

      res.json({test: "true"});

  }).catch(next);
}

function sendJobToLinkedIn(req, res, next) {

  var id = req.params.id;

  SendJobToLinkedIn.execute(id).then(function() {

      res.status(httpStatus.ACCEPTED).end();

  }).catch(next);
}

module.exports = router;