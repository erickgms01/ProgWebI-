import Music from './musicModel.js';

const musicController = {
    getAllMusic: async (req, res) => {
        try {
            const allMusic = await Music.find();
            res.json(allMusic);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    addMusic: async (req, res) => {
        const musicData = req.body;
        const newMusic = new Music(musicData);

        try {
            const savedMusic = await newMusic.save();
            res.status(201).json(savedMusic);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
};

export default musicController;
