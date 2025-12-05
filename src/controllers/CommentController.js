const commentModel = require("../models/Comment");
const postModel = require("../models/Post");

// Listar comentarios de un post
module.exports.listarPorPost = async (req, res) => {
    try {
        const comentarios = await commentModel.find({ 
            post: req.params.postId,
            activo: true 
        })
            .populate('usuario', 'nombre')
            .populate('respuesta_a', 'contenido')
            .sort({ fecha_creacion: -1 })
            .exec();
        
        res.json({ success: true, data: comentarios });
    } catch (error) {
        console.log(`Error al listar comentarios: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener comentarios" });
    }
};

// Crear comentario
module.exports.crear = async (req, res) => {
    try {
        const { post, usuario, contenido, respuesta_a } = req.body;
        
        // Verificar que el post existe
        const postExiste = await postModel.findById(post);
        if (!postExiste) {
            return res.status(404).json({ success: false, message: "Post no encontrado" });
        }
        
        const nuevoComentario = new commentModel({
            post,
            usuario,
            contenido,
            respuesta_a
        });
        
        const comentarioGuardado = await nuevoComentario.save();
        
        // Incrementar contador de comentarios en el post
        postExiste.comentarios_count += 1;
        await postExiste.save();
        
        // Poblar datos antes de enviar respuesta
        const comentarioCompleto = await commentModel.findById(comentarioGuardado._id)
            .populate('usuario', 'nombre')
            .exec();
        
        res.json({ 
            success: true, 
            data: comentarioCompleto, 
            message: "Comentario publicado" 
        });
    } catch (error) {
        console.log(`Error al crear comentario: ${error}`);
        res.status(500).json({ success: false, message: "Error al publicar comentario" });
    }
};

// Dar/quitar like a un comentario
module.exports.toggleLike = async (req, res) => {
    try {
        const { usuarioId } = req.body;
        const comentario = await commentModel.findById(req.params.id);
        
        if (!comentario) {
            return res.status(404).json({ success: false, message: "Comentario no encontrado" });
        }
        
        const likeIndex = comentario.likes.indexOf(usuarioId);
        
        if (likeIndex > -1) {
            // Ya tiene like, quitar
            comentario.likes.splice(likeIndex, 1);
        } else {
            // Agregar like
            comentario.likes.push(usuarioId);
        }
        
        await comentario.save();
        
        res.json({ 
            success: true, 
            data: comentario,
            likes_count: comentario.likes.length,
            liked: likeIndex === -1
        });
    } catch (error) {
        console.log(`Error al dar like a comentario: ${error}`);
        res.status(500).json({ success: false, message: "Error al procesar like" });
    }
};

// Editar comentario
module.exports.editar = async (req, res) => {
    try {
        const { contenido } = req.body;
        
        const comentario = await commentModel.findByIdAndUpdate(
            req.params.id,
            { contenido },
            { new: true, runValidators: true }
        ).populate('usuario', 'nombre');
        
        if (!comentario) {
            return res.status(404).json({ success: false, message: "Comentario no encontrado" });
        }
        
        res.json({ success: true, data: comentario, message: "Comentario actualizado" });
    } catch (error) {
        console.log(`Error al editar comentario: ${error}`);
        res.status(500).json({ success: false, message: "Error al actualizar comentario" });
    }
};

// Eliminar comentario
module.exports.borrar = async (req, res) => {
    try {
        const comentario = await commentModel.findById(req.params.id);
        
        if (!comentario) {
            return res.status(404).json({ success: false, message: "Comentario no encontrado" });
        }
        
        // Decrementar contador en el post
        const post = await postModel.findById(comentario.post);
        if (post) {
            post.comentarios_count = Math.max(0, post.comentarios_count - 1);
            await post.save();
        }
        
        await commentModel.findByIdAndDelete(req.params.id);
        
        res.json({ success: true, message: "Comentario eliminado" });
    } catch (error) {
        console.log(`Error al eliminar comentario: ${error}`);
        res.status(500).json({ success: false, message: "Error al eliminar comentario" });
    }
};

// Ocultar comentario (moderar)
module.exports.ocultar = async (req, res) => {
    try {
        const comentario = await commentModel.findByIdAndUpdate(
            req.params.id,
            { activo: false },
            { new: true }
        );
        
        if (!comentario) {
            return res.status(404).json({ success: false, message: "Comentario no encontrado" });
        }
        
        res.json({ success: true, data: comentario, message: "Comentario ocultado" });
    } catch (error) {
        console.log(`Error al ocultar comentario: ${error}`);
        res.status(500).json({ success: false, message: "Error al ocultar comentario" });
    }
};
