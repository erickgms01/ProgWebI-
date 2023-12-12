import express from 'express';
import passport from '../controllers/passportLocal.js';
var router = express.Router();

router.get('/', (req, res) => {
    res.render('login/signin.ejs')
})

router.post('/login/password', passport.authenticate('local', {
    successReturnToOrRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true
  }));

  router.post('/logout', function(req, res, next) {
    req.logout(function(err) {
      if (err) { return next(err); }
      res.redirect('/');
    });
  });

export default router; 