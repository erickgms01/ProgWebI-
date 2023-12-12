
import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
    res.render('musicPlayer/musicPlayer.ejs')
});

export default router;