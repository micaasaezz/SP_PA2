const express = require('express');
const bodyParser = require('body-parser');
const users = require('./routes/users');
const login = require('./routes/login');
const registro = require('./routes/registro');
const materia = require('./routes/materia');
const inscripcion = require('./routes/inscripcion');
const notas = require('./routes/notas');
const { saveRegistroAPI } = require('./modules/registros/save');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(saveRegistroAPI);

app.use('/users', users);
app.use('/login', login);
app.use('/registro', registro);
app.use('/materia', materia);
app.use('/inscripcion', inscripcion);
app.use('/notas', notas);

app.listen(3100, () => console.log(`listening on http://localhost:3100`));
