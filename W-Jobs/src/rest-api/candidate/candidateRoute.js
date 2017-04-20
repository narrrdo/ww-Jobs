'use strict'

var express = require('express');
var router = express.Router();
var auth = require("../security/auth")(); 
var Permission = require('../../common/constant/permission');
var CreateCandidate = require('../../application/candidate/createCandidate');
var FindAllCandidate = require('../../application/candidate/findAllCandidate');
var FindCandidateById = require('../../application/candidate/findCandidateById');
// var UpdatePermission = require('../../application/permission/updatePermission');
var DeleteCandidate = require('../../application/candidate/deleteCandidate');

router.get('/', findAllCandidate);
router.get('/:id', findCandidateById);
router.post('/', createCandidate);
// router.put('/:id', auth.hasPermission(Permission.PERMISSION_UPDATE), updatePermission);
router.delete('/:id', deleteCandidate);

function findAllCandidate(req, res, next){

    FindAllCandidate.execute().then(function(docs) {

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
  
    CreateCandidate.execute(req.body).then(function(doc) {

        res.json(doc);

    }).catch(next);
}

// function updateCandidate(req, res, next) {

//     var id = req.params.id;

//     UpdatePermission.execute(id, req.body).then(function(permission) {

//         res.json(permission);

//     }).catch(next);
// }

function deleteCandidate(req, res, next) {

    var id = req.params.id;

    DeleteCandidate.execute(id).then(function(resp) {

        res.json(resp);

    }).catch(next);
}

module.exports = router;