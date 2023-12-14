import Music from '../models/musicModel.js';

export const musicController = {
    addMusic: async (req, res) => {
        const { name, artist, cover, src } = req.body;

        try {
            const newMusic = new Music({ name, artist, cover, src });
            
            if (!name || !artist || !password){ 
                return res.status(400).json({erro: 'música não encontrada' });
            }
            
            const savedMusic = await newMusic.save();
            
            res.status(201).json(savedMusic);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
};
