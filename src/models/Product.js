const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    titulo: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    sku: { type: String, required: true, unique: true },
    
    // FUSIÓN: Array de URLs de imágenes (antes tabla Imagenes_Producto)
    imagenes: [{ type: String }],
    
    // FUSIÓN: Metadatos flexibles (antes tabla Metadatos_Producto)
    metadatos: {
      marca: { type: String },
      modelo: { type: String },
      peso: { type: String },
      dimensiones: { type: String },
      garantia: { type: String },
      otros: { type: Schema.Types.Mixed }
    },
    
    // REFERENCIA: Categoría (antes tabla intermedia)
    categoria: { 
      type: Schema.Types.ObjectId, 
      ref: 'categorias',
      required: true
    },
    
    // Control de estado
    activo: { type: Boolean, default: true }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const productModel = mongoose.model('productos', productSchema);

module.exports = productModel;
