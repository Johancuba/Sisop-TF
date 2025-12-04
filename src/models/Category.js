const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const categorySchema = new Schema(
  {
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String },
    activo: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const categoryModel = mongoose.model('categorias', categorySchema);

module.exports = categoryModel;
