// Importando módulo dotenv
import dotenv from 'dotenv';
dotenv.config();

// Importando módulos
import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import flash from 'connect-flash';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Definindo constantes
const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

// Conexão com o banco de dados
const uri = process.env.CONNECTIONSTRING;
mongoose.connect(uri)
  .then(() => {
    app.emit('pronto');
    console.log('Conectado com sucesso');
  })
  .catch(err => console.log('Erro: ' + err));

// Configuração e utilização de sessões
function generateSessionSecret(length) {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let secret = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    secret += charset[randomIndex];
  }
  return secret;
}
const sessionSecret = generateSessionSecret(21);

const store = MongoStore.create({
  mongoUrl: uri,
  collectionName: "sessions"
});

const sessionOpt = session({
  secret: sessionSecret,
  store: store,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60, // 1 hora
    httpOnly: true
  }
});
app.use(sessionOpt);
app.use(flash());

// Usando Passport (importado de './controllers/passportLocal.js')
import passport from "./controllers/passportLocal.js";
app.use(passport.initialize());
app.use(passport.session());

//Guardando o valor de 'isAuthenticated' na sessão
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

app.use((req, res, next) => {
  res.locals.songs = req.songs || null;
  next(); 
});

// Permitindo requisições do corpo dos formulários
app.use(bodyParser.urlencoded({ extended: true }));

// Para visualização dos arquivos .ejs
app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')


// Definindo local dos arquivos estáticos
const pathPublic = path.join(__dirname, '..', 'public');
app.use(express.static(pathPublic));

// Definindo rotas
import musicplayerRoute from './routes/musicPlayerRoute.js';
import addingMusicRoute from './routes/addingMusicRoute.js';
import loginRoute from './routes/loginRoute.js';
import signinRoute from './routes/signInRoute.js';
import signupRoute from './routes/signUpRoute.js';

// Configurando Rotas
app.use('/', musicplayerRoute);
app.use('/addMusic', addingMusicRoute);
app.use('/login', loginRoute);
app.use('/login/signin', signinRoute);
app.use('/login/signup', signupRoute);

//O servidor roda ao  
app.on('pronto', () => {
  app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });
});