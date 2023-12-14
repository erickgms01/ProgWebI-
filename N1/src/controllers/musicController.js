import Music from '../models/musicModel.js';

export const musicController = {
    addMusic: async (req, res) => {
        const { name, artist, cover, src } = req.body;

        try {
            // Verifica se todos os campos obrigatórios estão presentes
            if (!name || !artist || !cover || !src) { 
                return res.status(400).json({ erro: 'Campos incompletos. Preencha todos os campos necessários.' });
            }

            const newMusic = new Music({ name, artist, cover, src });
            const savedMusic = await newMusic.save();
            
            res.status(201).json(savedMusic);

        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },
    getMusicList: async () => {
        try {
            const musicList = await Music.find({}); // Recupera todas as músicas no banco de dados
            return musicList;
        } catch (error) {
            console.error('Erro ao buscar músicas:', error);
            return [];
        }
    }
    
};
