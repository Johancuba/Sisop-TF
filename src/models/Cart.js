const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
        required: true
    },
    cantidad: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    precio_unitario: {
        type: Number,
        required: true
    }
});

const cartSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true,
        unique: true
    },
    items: [cartItemSchema],
    total: {
        type: Number,
        default: 0
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now
    }
}, { collection: 'carritos' });

// Calcular total automáticamente
cartSchema.methods.calcularTotal = function() {
    this.total = this.items.reduce((sum, item) => {
        return sum + (item.precio_unitario * item.cantidad);
    }, 0);
    return this.total;
};

// Middleware para actualizar fecha
cartSchema.pre('save', function(next) {
    this.fecha_actualizacion = Date.now();
    this.calcularTotal();
    next();
});

module.exports = mongoose.model("carritos", cartSchema);
