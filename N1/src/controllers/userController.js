import UserModel from '../models/userModel.js';

export const createUser = async(req, res) => {
    try {
        const {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({erro: 'Dados invalidos'});
        }
        
        const existingUser = await UserModel.findOne({email});

        if(existingUser){
            return res.status(409).json({erro: 'Usuário já existe'});
        }

        const newUser = new UserModel({ username, email, password});

        await newUser.save();

        req.login(newUser, (err) => {
            if (err) {
              console.error('Erro ao fazer login após criar novo usuário: ', err);
              res.status(500).json({ erro: 'Erro ao fazer login após criar usuário' });
            } else {
              res.redirect('/');
            }
          });
      

    } catch (error) {
        console.error('Erro ao criar novo usuário: ', error);
        res.status(500).json({erro: 'Erro ao criar usuário: '});
    }
};