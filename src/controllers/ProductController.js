const productModel = require("../models/Product")
const categoryModel = require("../models/Category")

// CRUD - MOSTRAR productos con populate de categoría
module.exports.mostrar = async(req, res)=>{ 
    try {
        const respuesta = await productModel.find({}).populate('categoria', 'nombre');
        res.json({success: true, data: respuesta});
    }
    catch(error){
        console.log(`No se pudo encontrar los objetos. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al obtener productos"})
    }
};

// CRUD - MOSTRAR un producto por ID
module.exports.mostrarPorId = async(req, res)=>{ 
    try {
        const id = req.params.id
        const respuesta = await productModel.findById(id).populate('categoria', 'nombre descripcion');
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Producto no encontrado"})
        }
        res.json({success: true, data: respuesta});
    }
    catch(error){
        console.log(`No se pudo encontrar el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al obtener producto"})
    }
};

// CRUD - CREAR Producto (con imágenes y metadatos embebidos)
module.exports.crear = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        // Validar que la categoría existe
        const categoriaExiste = await categoryModel.findById(req.body.categoria);
        if(!categoriaExiste) {
            return res.status(400).json({success: false, message: "Categoría no válida"})
        }

        const newProducto = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            sku: req.body.sku,
            imagenes: req.body.imagenes || [],
            metadatos: {
                marca: req.body.metadatos?.marca,
                modelo: req.body.metadatos?.modelo,
                peso: req.body.metadatos?.peso,
                dimensiones: req.body.metadatos?.dimensiones,
                garantia: req.body.metadatos?.garantia,
                otros: req.body.metadatos?.otros
            },
            categoria: req.body.categoria,
            activo: req.body.activo !== undefined ? req.body.activo : true
        }
        const respuesta = await new productModel(newProducto).save();
        res.json({success: true, data: respuesta, message: "Producto creado exitosamente"})
    }
    catch(error){
        console.log(`No se pudo insertar el objeto. Error: ${error}`)
        if(error.code === 11000) {
            return res.status(400).json({success: false, message: "El SKU ya existe"})
        }
        res.status(500).json({success: false, message: "Error al crear producto"})
    }
};

// CRUD - EDITAR Producto
module.exports.editar = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const id = req.params.id
        
        // Validar que la categoría existe si se envía
        if(req.body.categoria) {
            const categoriaExiste = await categoryModel.findById(req.body.categoria);
            if(!categoriaExiste) {
                return res.status(400).json({success: false, message: "Categoría no válida"})
            }
        }

        const updateData = {
            titulo: req.body.titulo,
            descripcion: req.body.descripcion,
            precio: req.body.precio,
            stock: req.body.stock,
            sku: req.body.sku,
            imagenes: req.body.imagenes,
            metadatos: {
                marca: req.body.metadatos?.marca,
                modelo: req.body.metadatos?.modelo,
                peso: req.body.metadatos?.peso,
                dimensiones: req.body.metadatos?.dimensiones,
                garantia: req.body.metadatos?.garantia,
                otros: req.body.metadatos?.otros
            },
            categoria: req.body.categoria,
            activo: req.body.activo
        }
        
        // Eliminar campos undefined
        Object.keys(updateData).forEach(key => 
            updateData[key] === undefined && delete updateData[key]
        );

        const respuesta = await productModel.findByIdAndUpdate(id, updateData, {new: true});
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Producto no encontrado"})
        }
        res.json({success: true, data: respuesta, message: "Producto actualizado"})
    }
    catch(error){
        console.log(`No se pudo actualizar el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al actualizar producto"})
    }
};

//CRUD - ELIMINAR Producto (borrado lógico)
module.exports.borrar = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const id = req.params.id
        console.log(id) //For TEST
        // Borrado lógico
        const respuesta = await productModel.findByIdAndUpdate(id, {activo: false}, {new: true});
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Producto no encontrado"})
        }
        res.json({success: true, message: "Producto desactivado (borrado lógico)"})
    }
    catch(error){
        console.log(`No se pudo remover el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al eliminar producto"})
    }
};

//CRUD - ELIMINAR Producto (borrado físico)
module.exports.borrarFisico = async(req, res)=>{
    try{
        const id = req.params.id
        const respuesta = await productModel.findByIdAndDelete(id);
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Producto no encontrado"})
        }
        res.json({success: true, message: "Producto eliminado permanentemente"})
    }
    catch(error){
        console.log(`No se pudo remover el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al eliminar producto"})
    }
};
