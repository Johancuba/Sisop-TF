const reviewModel = require("../models/Review");
const productModel = require("../models/Product");

// Listar todas las reviews
module.exports.listar = async (req, res) => {
    try {
        const reviews = await reviewModel.find()
            .populate('usuario', 'nombre')
            .populate('producto', 'titulo')
            .sort({ fecha_creacion: -1 })
            .exec();
        res.json({ success: true, data: reviews });
    } catch (error) {
        console.log(`Error al listar reviews: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener reviews" });
    }
};

// Obtener reviews de un producto
module.exports.listarPorProducto = async (req, res) => {
    try {
        const reviews = await reviewModel.find({ 
            producto: req.params.productoId,
            aprobado: true 
        })
            .populate('usuario', 'nombre')
            .sort({ fecha_creacion: -1 })
            .exec();
        
        // Calcular promedio de calificaciones
        const promedio = reviews.length > 0
            ? reviews.reduce((sum, r) => sum + r.calificacion, 0) / reviews.length
            : 0;
        
        res.json({ 
            success: true, 
            data: reviews,
            stats: {
                total: reviews.length,
                promedio: promedio.toFixed(1)
            }
        });
    } catch (error) {
        console.log(`Error al listar reviews del producto: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener reviews" });
    }
};

// Crear review
module.exports.crear = async (req, res) => {
    try {
        const { producto, usuario, calificacion, titulo, comentario } = req.body;
        
        // Validar que el producto existe
        const productoExiste = await productModel.findById(producto);
        if (!productoExiste) {
            return res.status(404).json({ success: false, message: "Producto no encontrado" });
        }
        
        // Verificar si el usuario ya hizo una review de este producto
        const reviewExistente = await reviewModel.findOne({ producto, usuario });
        if (reviewExistente) {
            return res.status(400).json({ 
                success: false, 
                message: "Ya has realizado una reseña de este producto" 
            });
        }
        
        const nuevaReview = new reviewModel({
            producto,
            usuario,
            calificacion,
            titulo,
            comentario
        });
        
        const reviewGuardada = await nuevaReview.save();
        
        res.json({ 
            success: true, 
            data: reviewGuardada, 
            message: "Reseña creada exitosamente. Pendiente de aprobación." 
        });
    } catch (error) {
        console.log(`Error al crear review: ${error}`);
        if (error.code === 11000) {
            return res.status(400).json({ 
                success: false, 
                message: "Ya has realizado una reseña de este producto" 
            });
        }
        res.status(500).json({ success: false, message: "Error al crear reseña" });
    }
};

// Aprobar review (solo admin)
module.exports.aprobar = async (req, res) => {
    try {
        const review = await reviewModel.findByIdAndUpdate(
            req.params.id,
            { aprobado: true },
            { new: true }
        );
        
        if (!review) {
            return res.status(404).json({ success: false, message: "Review no encontrada" });
        }
        
        res.json({ success: true, data: review, message: "Review aprobada" });
    } catch (error) {
        console.log(`Error al aprobar review: ${error}`);
        res.status(500).json({ success: false, message: "Error al aprobar review" });
    }
};

// Marcar review como útil
module.exports.marcarUtil = async (req, res) => {
    try {
        const review = await reviewModel.findByIdAndUpdate(
            req.params.id,
            { $inc: { util_count: 1 } },
            { new: true }
        );
        
        if (!review) {
            return res.status(404).json({ success: false, message: "Review no encontrada" });
        }
        
        res.json({ success: true, data: review });
    } catch (error) {
        console.log(`Error al marcar review: ${error}`);
        res.status(500).json({ success: false, message: "Error al procesar" });
    }
};

// Eliminar review
module.exports.borrar = async (req, res) => {
    try {
        const review = await reviewModel.findByIdAndDelete(req.params.id);
        
        if (!review) {
            return res.status(404).json({ success: false, message: "Review no encontrada" });
        }
        
        res.json({ success: true, message: "Review eliminada" });
    } catch (error) {
        console.log(`Error al eliminar review: ${error}`);
        res.status(500).json({ success: false, message: "Error al eliminar review" });
    }
};
