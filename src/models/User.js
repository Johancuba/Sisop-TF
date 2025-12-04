const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'editor'], default: 'admin' },
    activo: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const userModel = mongoose.model('usuarios', userSchema);

module.exports = userModel;
