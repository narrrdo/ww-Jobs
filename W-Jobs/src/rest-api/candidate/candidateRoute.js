'use strict'

var express = require('express');
var router = express.Router();
var multer  = require('multer')
var auth = require("../security/auth")(); 
var Permission = require('../../common/constant/permission');
var CreateCandidate = require('../../application/candidate/createCandidate');
var FindAllCandidate = require('../../application/candidate/findAllCandidate');
var FindCandidateById = require('../../application/candidate/findCandidateById');
var UpdateCandidate = require('../../application/candidate/updateCandidate');
var DeleteCandidate = require('../../application/candidate/deleteCandidate');
var GetResumeFile = require('../../application/candidate/getResumeFile');

var storage = multer.memoryStorage()
var upload = multer({ storage: storage })

router.get('/', auth.hasPermission(Permission.CANDIDATES_GET_ALL), findAllCandidate);
router.get('/:id', auth.hasPermission(Permission.CANDIDATES_GET_DETAILS), findCandidateById);
router.post('/', auth.hasPermission(Permission.CANDIDATES_ADD), upload.single('file'), createCandidate);
router.put('/:id', auth.hasPermission(Permission.CANDIDATES_UPDATE), upload.single('file'), updateCandidate);
router.delete('/:id', auth.hasPermission(Permission.CANDIDATES_DELETE), deleteCandidate);

router.get('/:id/resume/pdf', getResumeFile); //auth.hasPermission(Permission.CANDIDATES_VIEW_RESUME)

function findAllCandidate(req, res, next){

  var search = req.query.q;

  FindAllCandidate.execute(search).then(function(docs) {

    res.json(docs);

  }).catch(next);
}

function findCandidateById(req, res, next) {

  var id = req.params.id;

  FindCandidateById.execute(id).then(function(doc) {

    res.json(doc);

  }).catch(next);
}


function createCandidate(req, res, next) {
  
  var file = req.file;

  CreateCandidate.execute(req.body, file).then(function(doc) {

    res.json(doc);

  }).catch(next);
}

function updateCandidate(req, res, next) {

  var id = req.params.id;
  var file = req.file;

  UpdateCandidate.execute(id, req.body, file).then(function(doc) {

    res.json(doc);

  }).catch(next);
}

function deleteCandidate(req, res, next) {

  var id = req.params.id;

  DeleteCandidate.execute(id).then(function(resp) {

    res.json(resp);

  }).catch(next);
}

function getResumeFile(req, res, next) {

  var id = req.params.id;

  GetResumeFile.execute(id).then(function(doc) {

    res.type('pdf');
    res.send(doc);

  }).catch(next);
}

module.exports = router;