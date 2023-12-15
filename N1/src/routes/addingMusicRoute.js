import express from 'express';
import { musicController } from '../controllers/musicController.js';
const router = express.Router();

router.get('/', (req, res) => { 
    res.render('musicPlayer/addingMusic.ejs');
})

router.post('/addMusic/enviar', musicController.addMusic);

export default router;