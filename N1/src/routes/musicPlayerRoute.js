
import express from 'express';
import { musicController } from '../controllers/musicController.js';
var router = express.Router();

router.get('/', (req, res) => {
    res.render('musicPlayer/musicPlayer.ejs');  
});

router.get('/listMusic', async (req, res) => {
    try {
        const musicList = await musicController.getAllMusicAsArray();
        res.json(musicList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
export default router;