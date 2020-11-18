const { Schema, model } = require('../dbMongoose');

const inscripcionesSchema = new Schema({
  idalumno: {
    type: String,
    required: true
  },
  idmateria: {
    type: String,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const inscripcionesModel = model('inscripciones', inscripcionesSchema);

module.exports = inscripcionesModel;
module.exports.entriesSchema = inscripcionesSchema;