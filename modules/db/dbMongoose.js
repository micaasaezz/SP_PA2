const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tesstdb', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function() {
  console.log('conexion abierta');
});


module.exports.Schema = mongoose.Schema;
module.exports.model = mongoose.model;
