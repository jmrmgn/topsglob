// Passport-jwt strategy
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

// Keys
const keys = require('../config/keys');

// Models
const User = require('../models/User');

// Options
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secret;

module.exports = passport => {
   passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
         .then(user => {
            if (user) {
               return done(null, user);
            }
            else {
               return done(null, false);
            }
         })
         .catch(err => console.log(err));
   }));
}