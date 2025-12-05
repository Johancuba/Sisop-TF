const postModel = require("../models/Post");
const commentModel = require("../models/Comment");

// Listar todos los posts (feed público)
module.exports.listar = async (req, res) => {
    try {
        const posts = await postModel.find({ activo: true })
            .populate('usuario', 'nombre')
            .populate('producto_relacionado', 'titulo precio imagenes')
            .sort({ destacado: -1, fecha_publicacion: -1 })
            .exec();
        res.json({ success: true, data: posts });
    } catch (error) {
        console.log(`Error al listar posts: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener posts" });
    }
};

// Listar posts de un usuario
module.exports.listarPorUsuario = async (req, res) => {
    try {
        const posts = await postModel.find({ 
            usuario: req.params.usuarioId,
            activo: true 
        })
            .populate('producto_relacionado', 'titulo precio imagenes')
            .sort({ fecha_publicacion: -1 })
            .exec();
        res.json({ success: true, data: posts });
    } catch (error) {
        console.log(`Error al listar posts del usuario: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener posts" });
    }
};

// Obtener un post por ID
module.exports.buscar = async (req, res) => {
    try {
        const post = await postModel.findById(req.params.id)
            .populate('usuario', 'nombre email')
            .populate('producto_relacionado', 'titulo precio stock imagenes')
            .populate('likes.usuario', 'nombre')
            .exec();
        
        if (!post) {
            return res.status(404).json({ success: false, message: "Post no encontrado" });
        }
        
        // Incrementar visualizaciones
        post.visualizaciones += 1;
        await post.save();
        
        res.json({ success: true, data: post });
    } catch (error) {
        console.log(`Error al buscar post: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener post" });
    }
};

// Crear post
module.exports.crear = async (req, res) => {
    try {
        const { usuario, tipo, titulo, descripcion, imagenes, producto_relacionado, tags } = req.body;
        
        const nuevoPost = new postModel({
            usuario,
            tipo,
            titulo,
            descripcion,
            imagenes: imagenes || [],
            producto_relacionado,
            tags: tags || []
        });
        
        const postGuardado = await nuevoPost.save();
        
        res.json({ 
            success: true, 
            data: postGuardado, 
            message: "Post creado exitosamente" 
        });
    } catch (error) {
        console.log(`Error al crear post: ${error}`);
        res.status(500).json({ success: false, message: "Error al crear post" });
    }
};

// Editar post
module.exports.editar = async (req, res) => {
    try {
        const { titulo, descripcion, imagenes, producto_relacionado, tags, activo, destacado } = req.body;
        
        const post = await postModel.findByIdAndUpdate(
            req.params.id,
            { 
                titulo,
                descripcion,
                imagenes,
                producto_relacionado,
                tags,
                activo,
                destacado,
                fecha_actualizacion: Date.now()
            },
            { new: true, runValidators: true }
        );
        
        if (!post) {
            return res.status(404).json({ success: false, message: "Post no encontrado" });
        }
        
        res.json({ success: true, data: post, message: "Post actualizado" });
    } catch (error) {
        console.log(`Error al editar post: ${error}`);
        res.status(500).json({ success: false, message: "Error al actualizar post" });
    }
};

// Dar/quitar like a un post
module.exports.toggleLike = async (req, res) => {
    try {
        const { usuarioId } = req.body;
        const post = await postModel.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ success: false, message: "Post no encontrado" });
        }
        
        // Verificar si el usuario ya dio like
        const likeIndex = post.likes.findIndex(
            like => like.usuario.toString() === usuarioId
        );
        
        if (likeIndex > -1) {
            // Ya tiene like, quitar
            post.likes.splice(likeIndex, 1);
        } else {
            // Agregar like
            post.likes.push({ usuario: usuarioId });
        }
        
        await post.save();
        
        res.json({ 
            success: true, 
            data: post, 
            likes_count: post.likes.length,
            liked: likeIndex === -1
        });
    } catch (error) {
        console.log(`Error al dar like: ${error}`);
        res.status(500).json({ success: false, message: "Error al procesar like" });
    }
};

// Eliminar post
module.exports.borrar = async (req, res) => {
    try {
        const post = await postModel.findByIdAndDelete(req.params.id);
        
        if (!post) {
            return res.status(404).json({ success: false, message: "Post no encontrado" });
        }
        
        // Eliminar comentarios asociados
        await commentModel.deleteMany({ post: req.params.id });
        
        res.json({ success: true, message: "Post eliminado" });
    } catch (error) {
        console.log(`Error al eliminar post: ${error}`);
        res.status(500).json({ success: false, message: "Error al eliminar post" });
    }
};

// Buscar posts por tags
module.exports.buscarPorTag = async (req, res) => {
    try {
        const posts = await postModel.find({ 
            tags: req.params.tag,
            activo: true 
        })
            .populate('usuario', 'nombre')
            .populate('producto_relacionado', 'titulo precio imagenes')
            .sort({ fecha_publicacion: -1 })
            .exec();
        
        res.json({ success: true, data: posts });
    } catch (error) {
        console.log(`Error al buscar posts por tag: ${error}`);
        res.status(500).json({ success: false, message: "Error al buscar posts" });
    }
};

// Obtener posts destacados
module.exports.destacados = async (req, res) => {
    try {
        const posts = await postModel.find({ destacado: true, activo: true })
            .populate('usuario', 'nombre')
            .populate('producto_relacionado', 'titulo precio imagenes')
            .limit(10)
            .sort({ fecha_publicacion: -1 })
            .exec();
        
        res.json({ success: true, data: posts });
    } catch (error) {
        console.log(`Error al obtener posts destacados: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener posts" });
    }
};
