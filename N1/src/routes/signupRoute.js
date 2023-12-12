import express from 'express';
import { createUser } from '../controllers/userController.js';
var router = express.Router();

router.get('/', (req, res) => {
    res.render('login/signup.ejs')
})

router.post('/', createUser);

export default router; 