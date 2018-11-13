const Auth = require('./controllers/auth');
const passport = require('passport');
require('./services/passport');
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requireAuth, function(req, res) {
    res.send({ hi: 'asd' });
  });
  app.post('/signin', requireSignin, Auth.signin);
  app.post('/signup', Auth.signup);
};