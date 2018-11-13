const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user) {
  const timestamp = Date.now();
  // sub指subject，表明该jwt属于谁，iat指issued at time，表明生成该jwt的时间戳
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send('you must provide a email and a password!');
  }
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) {
      return next(err);
    }
    if (existingUser) {
      res.status(422).send({ error: 'email is in use' });
    }
    const user = new User({ email, password });
    user.save(function(err) {
      if (err) return next(err);
      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function(req, res, next) {
  res.send({
    token: tokenForUser(req.user)
  });
};
