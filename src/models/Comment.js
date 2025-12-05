const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts',
        required: true
    },
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios',
        required: true
    },
    contenido: {
        type: String,
        required: true,
        maxlength: 500
    },
    respuesta_a: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comentarios'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'usuarios'
    }],
    activo: {
        type: Boolean,
        default: true
    },
    fecha_creacion: {
        type: Date,
        default: Date.now
    }
}, { collection: 'comentarios' });

module.exports = mongoose.model("comentarios", commentSchema);
