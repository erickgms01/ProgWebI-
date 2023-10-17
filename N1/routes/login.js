var express = require('express');
var router = express.Router();

router.get('/login', (req, res) => {
    res.render('login/login.ejs')
})

module.exports = router;