'use strict'

var passport = require("passport");  
var passportJWT = require("passport-jwt");  
var cfg = require("../../../config");  
var ExtractJwt = passportJWT.ExtractJwt;  
var Strategy = passportJWT.Strategy;  
var params = {  
    secretOrKey: cfg.jwtSecret,
    jwtFromRequest: ExtractJwt.versionOneCompatibility({authScheme: 'Bearer'})
};

module.exports = function() {  

  var strategy = new Strategy(params, function(payload, done) {

    if (payload) {

      return done(null, payload, {});

    } else {
            
      return done(new Error("User not found"), null);
    }
  });

  passport.use(strategy);

  return {

    initialize: function() {

      return passport.initialize();
    },
    authenticate: function() {

      return passport.authenticate("jwt", cfg.jwtSession); //  {expiresInMinutes: 400 } expires in 24 hours
    },
    hasPermission: function(...perm) {

      return [passport.authenticate("jwt", cfg.jwtSession), function(req, res, next){

        var hasPerm = false;

        if(req.user && req.user.role && req.user.role.permissions) {
        
          var perms = req.user.role.permissions;

          perms.forEach(function(item){

              if(perm.indexOf(item) != -1){
              
                hasPerm = true;
                next();
              }
          });
        }
          
        if(!hasPerm) {

            res.send(401, 'Unauthorized');
        }
      }
    ]}
  };
};