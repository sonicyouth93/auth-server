const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

//create local strategy
const localOptions = {
  usernameField: 'email'
};
const localLogin = new LocalStrategy(localOptions, function(
  email,
  password,
  done
) {
  User.findOne({ email: email }, function(err, user) {
    if (err) return done(err);
    if (!user) return done(null, false);
    user
      .comparePassword(password)
      .then(() => done(null, user))
      .catch(err => {
        if (err) return done(err);
        done(null, false);
      });
  });
});
// setup options for jwt stragtegy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.secret
};

// create stragegy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  User.findById(payload.sub, function(err, user) {
    if (err) return done(err, false);
    if (user) return done(null, user);
    return done(null, false);
  });
});
// use strategy
passport.use(jwtLogin);
passport.use(localLogin);
