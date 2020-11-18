const { Schema, model } = require('../dbMongoose');

const registrosSchema = new Schema({
  ip: {
    type: Object,
    required: true
  },
  hora: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  ruta: {
    type: String,
    required: true
  },
  usuario: {
    type: Object,
    required: false
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const registrosModel = model('registros', registrosSchema);

module.exports = registrosModel;
module.exports.entriesSchema = registrosSchema;