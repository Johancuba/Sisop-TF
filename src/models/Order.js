const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
        required: true
    },
    titulo: { type: String, required: true },
    precio: { type: Number, required: true },
    cantidad: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true }
});

const orderSchema = new mongoose.Schema({
    numero_orden: {
        type: String,
        unique: true,
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    items: [orderItemSchema],
    total: {
        type: Number,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'],
        default: 'pendiente'
    },
    datos_envio: {
        nombre_completo: String,
        direccion: String,
        ciudad: String,
        codigo_postal: String,
        telefono: String
    },
    metodo_pago: {
        type: String,
        enum: ['tarjeta', 'paypal', 'transferencia', 'efectivo'],
        default: 'efectivo'
    },
    notas: String,
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now
    }
}, { collection: 'ordenes' });

// Middleware para actualizar fecha de modificación
orderSchema.pre('save', function(next) {
    this.fecha_actualizacion = Date.now();
    next();
});

// Generar número de orden automáticamente
orderSchema.pre('save', async function(next) {
    if (!this.numero_orden) {
        const count = await this.constructor.countDocuments();
        this.numero_orden = `ORD-${Date.now()}-${count + 1}`;
    }
    next();
});

module.exports = mongoose.model("ordenes", orderSchema);
