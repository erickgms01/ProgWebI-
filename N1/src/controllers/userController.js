import UserModel from '../models/userModel.js';

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ erro: 'Dados inválidos' });
        }

        const existingUser = await UserModel.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ erro: 'Usuário já existe' });
        }

        const newUser = new UserModel({ username, email, password });

        // Salva o novo usuário no banco de dados
        await newUser.save();
        const userId = req.user.id;
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ erro: 'Usuário não encontrado.' });
        };
        
        await user.save();


        // Autentica o novo usuário
        req.login(newUser, async (err) => {
            if (err) {
                console.error('Erro ao fazer login após criar novo usuário: ', err);
                return res.status(500).json({ erro: 'Erro ao fazer login após criar usuário' });
            }
            res.redirect('/')
        });

    } catch (error) {
        console.error('Erro ao criar novo usuário: ', error);
        res.status(500).json({ erro: 'Erro ao criar usuário' });
    }
};
