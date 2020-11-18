const { Schema, model } = require('../dbMongoose');

const userSchema = new Schema({
  email: {
    type: Schema.Types.Mixed,
    required: true,
    unique: true,
    trim: true
  },
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  clave: {
    type: String,
    required: true,
    minlength: 4
  },
  tipo: {
    type: String,
    enum: ['alumno', 'profesor', 'admin'],
    required: true
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});


const userModel = model('users', userSchema);

module.exports = userModel;
module.exports.userSchema = userSchema;