var express = require('express');
var router = express.Router();

router.get('/musicPlayer', (req, res) => {
    res.render('musicPlayer/musicPlayer.ejs')
})

module.exports = router;