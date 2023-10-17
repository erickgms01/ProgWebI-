var express = require('express');
var router = express.Router();

router.get('/login/signup', (req, res) => {
  res.render('login/signup.ejs'); 
});

module.exports = router;