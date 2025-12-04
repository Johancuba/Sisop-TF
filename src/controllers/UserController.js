const userModel = require("../models/User")

// CRUD - MOSTRAR usuarios
module.exports.mostrar = async(req, res)=>{ 
    try {
        // No mostrar password en la respuesta
        const respuesta = await userModel.find({}).select('-password')
        res.json({success: true, data: respuesta});
    }
    catch(error){
        console.log(`No se pudo encontrar los objetos. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al obtener usuarios"})
    }
};

// CRUD - MOSTRAR un usuario por ID
module.exports.mostrarPorId = async(req, res)=>{ 
    try {
        const id = req.params.id
        const respuesta = await userModel.findById(id).select('-password');
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Usuario no encontrado"})
        }
        res.json({success: true, data: respuesta});
    }
    catch(error){
        console.log(`No se pudo encontrar el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al obtener usuario"})
    }
};

// CRUD - CREAR Usuario
module.exports.crear = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const newUsuario = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password, // En producción deberías hashear esto
            rol: req.body.rol || 'admin',
            activo: req.body.activo !== undefined ? req.body.activo : true
        }
        const respuesta = await new userModel(newUsuario).save();
        
        // No devolver password
        const usuarioSinPassword = respuesta.toObject();
        delete usuarioSinPassword.password;
        
        res.json({success: true, data: usuarioSinPassword, message: "Usuario creado exitosamente"})
    }
    catch(error){
        console.log(`No se pudo insertar el objeto. Error: ${error}`)
        if(error.code === 11000) {
            return res.status(400).json({success: false, message: "El email ya existe"})
        }
        res.status(500).json({success: false, message: "Error al crear usuario"})
    }
};

// CRUD - EDITAR Usuario
module.exports.editar = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const id = req.params.id
        const updateData = {
            nombre: req.body.nombre,
            email: req.body.email,
            password: req.body.password, // En producción deberías hashear esto
            rol: req.body.rol,
            activo: req.body.activo
        }
        
        // Eliminar campos undefined
        Object.keys(updateData).forEach(key => 
            updateData[key] === undefined && delete updateData[key]
        );

        const respuesta = await userModel.findByIdAndUpdate(id, updateData, {new: true}).select('-password');
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Usuario no encontrado"})
        }
        res.json({success: true, data: respuesta, message: "Usuario actualizado"})
    }
    catch(error){
        console.log(`No se pudo actualizar el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al actualizar usuario"})
    }
};

//CRUD - ELIMINAR Usuario
module.exports.borrar = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const id = req.params.id
        console.log(id) //For TEST
        const respuesta = await userModel.findByIdAndDelete(id);
        if(!respuesta) {
            return res.status(404).json({success: false, message: "Usuario no encontrado"})
        }
        res.json({success: true, message: "Usuario eliminado"})
    }
    catch(error){
        console.log(`No se pudo remover el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al eliminar usuario"})
    }
};
