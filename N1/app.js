const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

const loginRoute = require('./routes/login.js');
const signinRoute = require('./routes/signin.js');
const signupRoute = require('./routes/signup.js');
const mp3Route = require('./routes/musicPlayer.js')

app.use('/', loginRoute);
app.use('/', signinRoute);
app.use('/', signupRoute);
app.use('/', mp3Route)


app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
