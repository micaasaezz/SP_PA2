const { Schema, model } = require('../dbMongoose');

const materiasSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  cuatrimestre: {
    type: Number,
    enum: [1,2,3,4],
    required: true
  },
  cupos: {
    type: Number,
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const materiasModel = model('materias', materiasSchema);

module.exports = materiasModel;
module.exports.entriesSchema = materiasSchema;