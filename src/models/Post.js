const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    tipo: {
        type: String,
        enum: ['promocion', 'novedad', 'contenido', 'producto_destacado'],
        default: 'contenido'
    },
    titulo: {
        type: String,
        required: true,
        maxlength: 200
    },
    descripcion: {
        type: String,
        required: true,
        maxlength: 2000
    },
    imagenes: [{
        type: String
    }],
    producto_relacionado: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productos'
    },
    tags: [{
        type: String
    }],
    likes: [{
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'usuarios'
        },
        fecha: {
            type: Date,
            default: Date.now
        }
    }],
    comentarios_count: {
        type: Number,
        default: 0
    },
    visualizaciones: {
        type: Number,
        default: 0
    },
    activo: {
        type: Boolean,
        default: true
    },
    destacado: {
        type: Boolean,
        default: false
    },
    fecha_publicacion: {
        type: Date,
        default: Date.now
    },
    fecha_actualizacion: {
        type: Date,
        default: Date.now
    }
}, { collection: 'posts' });

// Middleware para actualizar fecha
postSchema.pre('save', function(next) {
    this.fecha_actualizacion = Date.now();
    next();
});

// Método para contar likes
postSchema.virtual('likes_count').get(function() {
    return this.likes.length;
});

module.exports = mongoose.model("posts", postSchema);
