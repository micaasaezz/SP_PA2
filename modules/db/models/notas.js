const { Schema, model } = require('../dbMongoose');

const notasSchema = new Schema({
  idalumno: {
    type: String,
    required: true
  },
  idmateria: {
    type: String,
    required: true
  },
  nota: {
    type: Number,
    required: true,
    min: 1,
    max: 10
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const notasModel = model('notas', notasSchema);

module.exports = notasModel;
module.exports.entriesSchema = notasSchema;