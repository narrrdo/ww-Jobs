'use strict'

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require('../../domain/users');


function execute(user){

  var resp = new Promise(function(resolve, reject){

    var salt = bcrypt.genSaltSync(10);

    var hashPassword = bcrypt.hashSync(user.password, salt);

    user.password = hashPassword;
    user.role = user.role.id;

    User.create(user).then(function(user){

      resolve(user);
        
    }).catch(function(error){

      reject(error);
    });
  });

    return resp;
}

module.exports.execute = execute;