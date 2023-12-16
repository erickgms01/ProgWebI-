import Music from '../models/musicModel.js';

export const musicController = {
    addMusic: async (req, res) => {
        const { name, artist, picture, url } = req.body;
        try {
            // Verifica se todos os campos obrigatórios estão presentes
            if (!name || !artist || !picture || !url) { 
                return res.status(400).json({ erro: 'Campos incompletos. Preencha todos os campos necessários.' });
            }

            const newMusic = new Music({ name, artist, picture, url });
            const savedMusic = await newMusic.save();
            
            res.status(201).json(savedMusic);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getAllMusicAsArray: async () => {
        try {
            const songsFromDB = await Music.find();
            const songsArray = songsFromDB.map(song => ({
                artist: song.artist,
                name: song.name,
                url: song.url,
                picture: song.picture,
            }));
            return songsArray;
        } catch (error) {
            throw new Error(error.message);
        }
    },
};
