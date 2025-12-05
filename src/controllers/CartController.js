const cartModel = require("../models/Cart");
const productModel = require("../models/Product");

// Obtener carrito del usuario
module.exports.obtenerCarrito = async (req, res) => {
    try {
        let carrito = await cartModel.findOne({ usuario: req.params.usuarioId })
            .populate('items.producto', 'titulo precio stock imagenes')
            .exec();
        
        if (!carrito) {
            carrito = new cartModel({ usuario: req.params.usuarioId, items: [] });
            await carrito.save();
        }
        
        res.json({ success: true, data: carrito });
    } catch (error) {
        console.log(`Error al obtener carrito: ${error}`);
        res.status(500).json({ success: false, message: "Error al obtener carrito" });
    }
};

// Agregar producto al carrito
module.exports.agregarItem = async (req, res) => {
    try {
        const { usuarioId, productoId, cantidad } = req.body;
        
        // Validar producto
        const producto = await productModel.findById(productoId);
        if (!producto || !producto.activo) {
            return res.status(400).json({ success: false, message: "Producto no disponible" });
        }
        
        if (producto.stock < cantidad) {
            return res.status(400).json({ 
                success: false, 
                message: `Stock insuficiente. Disponible: ${producto.stock}` 
            });
        }
        
        // Buscar o crear carrito
        let carrito = await cartModel.findOne({ usuario: usuarioId });
        
        if (!carrito) {
            carrito = new cartModel({ usuario: usuarioId, items: [] });
        }
        
        // Verificar si el producto ya está en el carrito
        const itemExistente = carrito.items.find(
            item => item.producto.toString() === productoId
        );
        
        if (itemExistente) {
            itemExistente.cantidad += cantidad;
            
            // Validar stock total
            if (producto.stock < itemExistente.cantidad) {
                return res.status(400).json({ 
                    success: false, 
                    message: `Stock insuficiente. Disponible: ${producto.stock}` 
                });
            }
        } else {
            carrito.items.push({
                producto: productoId,
                cantidad: cantidad,
                precio_unitario: producto.precio
            });
        }
        
        await carrito.save();
        
        // Repoblar para devolver datos completos
        carrito = await cartModel.findById(carrito._id)
            .populate('items.producto', 'titulo precio stock imagenes')
            .exec();
        
        res.json({ 
            success: true, 
            data: carrito, 
            message: "Producto agregado al carrito" 
        });
        
    } catch (error) {
        console.log(`Error al agregar al carrito: ${error}`);
        res.status(500).json({ success: false, message: "Error al agregar al carrito" });
    }
};

// Actualizar cantidad de un item
module.exports.actualizarItem = async (req, res) => {
    try {
        const { usuarioId, productoId, cantidad } = req.body;
        
        const carrito = await cartModel.findOne({ usuario: usuarioId });
        
        if (!carrito) {
            return res.status(404).json({ success: false, message: "Carrito no encontrado" });
        }
        
        const item = carrito.items.find(
            item => item.producto.toString() === productoId
        );
        
        if (!item) {
            return res.status(404).json({ success: false, message: "Producto no encontrado en el carrito" });
        }
        
        // Validar stock
        const producto = await productModel.findById(productoId);
        if (producto.stock < cantidad) {
            return res.status(400).json({ 
                success: false, 
                message: `Stock insuficiente. Disponible: ${producto.stock}` 
            });
        }
        
        item.cantidad = cantidad;
        await carrito.save();
        
        // Repoblar
        const carritoActualizado = await cartModel.findById(carrito._id)
            .populate('items.producto', 'titulo precio stock imagenes')
            .exec();
        
        res.json({ 
            success: true, 
            data: carritoActualizado, 
            message: "Cantidad actualizada" 
        });
        
    } catch (error) {
        console.log(`Error al actualizar item: ${error}`);
        res.status(500).json({ success: false, message: "Error al actualizar item" });
    }
};

// Eliminar item del carrito
module.exports.eliminarItem = async (req, res) => {
    try {
        const { usuarioId, productoId } = req.params;
        
        const carrito = await cartModel.findOne({ usuario: usuarioId });
        
        if (!carrito) {
            return res.status(404).json({ success: false, message: "Carrito no encontrado" });
        }
        
        carrito.items = carrito.items.filter(
            item => item.producto.toString() !== productoId
        );
        
        await carrito.save();
        
        // Repoblar
        const carritoActualizado = await cartModel.findById(carrito._id)
            .populate('items.producto', 'titulo precio stock imagenes')
            .exec();
        
        res.json({ 
            success: true, 
            data: carritoActualizado, 
            message: "Producto eliminado del carrito" 
        });
        
    } catch (error) {
        console.log(`Error al eliminar item: ${error}`);
        res.status(500).json({ success: false, message: "Error al eliminar item" });
    }
};

// Vaciar carrito
module.exports.vaciarCarrito = async (req, res) => {
    try {
        const carrito = await cartModel.findOne({ usuario: req.params.usuarioId });
        
        if (!carrito) {
            return res.status(404).json({ success: false, message: "Carrito no encontrado" });
        }
        
        carrito.items = [];
        carrito.total = 0;
        await carrito.save();
        
        res.json({ success: true, data: carrito, message: "Carrito vaciado" });
    } catch (error) {
        console.log(`Error al vaciar carrito: ${error}`);
        res.status(500).json({ success: false, message: "Error al vaciar carrito" });
    }
};
