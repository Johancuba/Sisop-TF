const orderModel = require("../models/Order");
const productModel = require("../models/Product");

// Listar todas las órdenes
module.exports.listar = async (req, res) => {
    try {
        const ordenes = await orderModel.find()
            .populate('usuario', 'nombre email')
            .sort({ fecha_creacion: -1 })
            .exec();
        res.json({ success: true, data: ordenes });
    } catch (error) {
        console.log(`Error al listar órdenes: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener órdenes" });
    }
};

// Obtener órdenes de un usuario
module.exports.listarPorUsuario = async (req, res) => {
    try {
        const ordenes = await orderModel.find({ usuario: req.params.usuarioId })
            .sort({ fecha_creacion: -1 })
            .exec();
        res.json({ success: true, data: ordenes });
    } catch (error) {
        console.log(`Error al listar órdenes del usuario: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener órdenes" });
    }
};

// Obtener una orden por ID
module.exports.buscar = async (req, res) => {
    try {
        const orden = await orderModel.findById(req.params.id)
            .populate('usuario', 'nombre email')
            .populate('items.producto', 'titulo sku')
            .exec();
        
        if (!orden) {
            return res.status(404).json({ success: false, message: "Orden no encontrada" });
        }
        
        res.json({ success: true, data: orden });
    } catch (error) {
        console.log(`Error al buscar orden: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener orden" });
    }
};

// Crear nueva orden
module.exports.crear = async (req, res) => {
    try {
        const { usuario, items, datos_envio, metodo_pago, notas } = req.body;
        
        // Validar items
        if (!items || items.length === 0) {
            return res.status(400).json({ success: false, message: "La orden debe tener al menos un producto" });
        }
        
        // Calcular total y validar stock
        let total = 0;
        const itemsValidados = [];
        
        for (const item of items) {
            const producto = await productModel.findById(item.producto);
            
            if (!producto || !producto.activo) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Producto no disponible: ${item.producto}` 
                });
            }
            
            if (producto.stock < item.cantidad) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Stock insuficiente para ${producto.titulo}. Disponible: ${producto.stock}` 
                });
            }
            
            const subtotal = producto.precio * item.cantidad;
            total += subtotal;
            
            itemsValidados.push({
                producto: producto._id,
                titulo: producto.titulo,
                precio: producto.precio,
                cantidad: item.cantidad,
                subtotal: subtotal
            });
            
            // Actualizar stock
            producto.stock -= item.cantidad;
            await producto.save();
        }
        
        // Crear orden
        const nuevaOrden = new orderModel({
            usuario,
            items: itemsValidados,
            total,
            datos_envio,
            metodo_pago,
            notas
        });
        
        const ordenGuardada = await nuevaOrden.save();
        
        res.json({ 
            success: true, 
            data: ordenGuardada, 
            message: "Orden creada exitosamente" 
        });
        
    } catch (error) {
        console.log(`Error al crear orden: ${error}`);
        res.status(500).json({ success: false, message: "Error al crear orden" });
    }
};

// Actualizar estado de orden
module.exports.actualizarEstado = async (req, res) => {
    try {
        const { estado } = req.body;
        
        const orden = await orderModel.findByIdAndUpdate(
            req.params.id,
            { estado, fecha_actualizacion: Date.now() },
            { new: true, runValidators: true }
        );
        
        if (!orden) {
            return res.status(404).json({ success: false, message: "Orden no encontrada" });
        }
        
        res.json({ success: true, data: orden, message: "Estado actualizado" });
    } catch (error) {
        console.log(`Error al actualizar orden: ${error}`);
        res.status(500).json({ success: false, message: "Error al actualizar orden" });
    }
};

// Cancelar orden
module.exports.cancelar = async (req, res) => {
    try {
        const orden = await orderModel.findById(req.params.id);
        
        if (!orden) {
            return res.status(404).json({ success: false, message: "Orden no encontrada" });
        }
        
        if (orden.estado === 'entregado') {
            return res.status(400).json({ 
                success: false, 
                message: "No se puede cancelar una orden ya entregada" 
            });
        }
        
        // Restaurar stock
        for (const item of orden.items) {
            const producto = await productModel.findById(item.producto);
            if (producto) {
                producto.stock += item.cantidad;
                await producto.save();
            }
        }
        
        orden.estado = 'cancelado';
        await orden.save();
        
        res.json({ success: true, data: orden, message: "Orden cancelada" });
    } catch (error) {
        console.log(`Error al cancelar orden: ${error}`);
        res.status(500).json({ success: false, message: "Error al cancelar orden" });
    }
};

// Eliminar orden (solo admin)
module.exports.borrar = async (req, res) => {
    try {
        const orden = await orderModel.findByIdAndDelete(req.params.id);
        
        if (!orden) {
            return res.status(404).json({ success: false, message: "Orden no encontrada" });
        }
        
        res.json({ success: true, message: "Orden eliminada" });
    } catch (error) {
        console.log(`Error al eliminar orden: ${error}`);
        res.status(500).json({ success: false, message: "Error al eliminar orden" });
    }
};
