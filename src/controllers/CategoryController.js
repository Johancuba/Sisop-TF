const categoryModel = require("../models/Category")

// CRUD - MOSTRAR categorías
module.exports.mostrar = async(req, res)=>{ 
    try {
        const respuesta = await categoryModel.find({})
        res.json({success: true, data: respuesta});
    }
    catch(error){
        console.log(`No se pudo encontrar los objetos. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al obtener categorías"})
    }
};

// CRUD - MOSTRAR una categoría por ID
module.exports.mostrarPorId = async(req, res)=>{ 
    try {
        const id = req.params.id
        const respuesta = await categoryModel.findById(id);
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Categoría no encontrada"})
        }
        res.json({success: true, data: respuesta});
    }
    catch(error){
        console.log(`No se pudo encontrar el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al obtener categoría"})
    }
};

// CRUD - CREAR Categoría
module.exports.crear = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const newCategoria = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            activo: req.body.activo !== undefined ? req.body.activo : true
        }
        const respuesta = await new categoryModel(newCategoria).save();
        res.json({success: true, data: respuesta, message: "Categoría creada exitosamente"})
    }
    catch(error){
        console.log(`No se pudo insertar el objeto. Error: ${error}`)
        if(error.code === 11000) {
            return res.status(400).json({success: false, message: "La categoría ya existe"})
        }
        res.status(500).json({success: false, message: "Error al crear categoría"})
    }
};

// CRUD - EDITAR Categoría
module.exports.editar = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const id = req.params.id
        const updateData = {
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            activo: req.body.activo
        }
        
        // Eliminar campos undefined
        Object.keys(updateData).forEach(key => 
            updateData[key] === undefined && delete updateData[key]
        );

        const respuesta = await categoryModel.findByIdAndUpdate(id, updateData, {new: true});
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Categoría no encontrada"})
        }
        res.json({success: true, data: respuesta, message: "Categoría actualizada"})
    }
    catch(error){
        console.log(`No se pudo actualizar el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al actualizar categoría"})
    }
};

//CRUD - ELIMINAR Categoría
module.exports.borrar = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const id = req.params.id
        console.log(id) //For TEST
        const respuesta = await categoryModel.findByIdAndDelete(id);
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Categoría no encontrada"})
        }
        res.json({success: true, message: "Categoría eliminada"})
    }
    catch(error){
        console.log(`No se pudo remover el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al eliminar categoría"})
    }
};
