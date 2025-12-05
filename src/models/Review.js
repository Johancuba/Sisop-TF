const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    calificacion: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    titulo: {
        type: String,
        required: true,
        maxlength: 100
    },
    comentario: {
        type: String,
        required: true,
        maxlength: 1000
    },
    verificado: {
        type: Boolean,
        default: false
    },
    aprobado: {
        type: Boolean,
        default: false
    },
    util_count: {
        type: Number,
        default: 0
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
}, { collection: 'reviews' });

// Índice compuesto: un usuario solo puede hacer una review por producto
reviewSchema.index({ producto: 1, usuario: 1 }, { unique: true });

module.exports = mongoose.model("reviews", reviewSchema);
