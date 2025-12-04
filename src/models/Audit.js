const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const auditSchema = new Schema(
  {
    accion: { type: String, required: true },
    usuario: { 
      type: Schema.Types.ObjectId, 
      ref: 'usuarios',
      required: true
    },
    detalle: { type: Schema.Types.Mixed },
    fecha: { type: Date, default: Date.now }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const auditModel = mongoose.model('auditorias', auditSchema);

module.exports = auditModel;
