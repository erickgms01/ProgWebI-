import express from 'express';
var router = express.Router();

router.get('/', (req, res) => {
    res.render('login/login.ejs')
})

export default router; 