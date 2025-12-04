const auditModel = require("../models/Audit")

// CRUD - MOSTRAR auditorías con populate de usuario
module.exports.mostrar = async(req, res)=>{ 
    try {
        const respuesta = await auditModel.find({}).populate('usuario', 'nombre email').sort({fecha: -1});
        res.json({success: true, data: respuesta});
    }
    catch(error){
        console.log(`No se pudo encontrar los objetos. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al obtener auditorías"})
    }
};

// CRUD - MOSTRAR auditorías por usuario
module.exports.mostrarPorUsuario = async(req, res)=>{ 
    try {
        const usuarioId = req.params.usuarioId
        const respuesta = await auditModel.find({usuario: usuarioId}).populate('usuario', 'nombre email').sort({fecha: -1});
        res.json({success: true, data: respuesta});
    }
    catch(error){
        console.log(`No se pudo encontrar los objetos. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al obtener auditorías"})
    }
};

// CRUD - CREAR Auditoría
module.exports.crear = async(req, res)=>{
    //console.log(req.body) //For TEST
    try{
        const newAudit = {
            accion: req.body.accion,
            usuario: req.body.usuario,
            detalle: req.body.detalle,
            fecha: new Date()
        }
        const respuesta = await new auditModel(newAudit).save();
        res.json({success: true, data: respuesta, message: "Auditoría registrada"})
    }
    catch(error){
        console.log(`No se pudo insertar el objeto. Error: ${error}`)
        res.status(500).json({success: false, message: "Error al registrar auditoría"})
    }
};

// Función helper para registrar auditorías (puede ser usada desde otros controladores)
module.exports.registrar = async(accion, usuarioId, detalle) => {
    try {
        const newAudit = {
            accion: accion,
            usuario: usuarioId,
            detalle: detalle,
            fecha: new Date()
        }
        await new auditModel(newAudit).save();
        console.log(`Auditoría registrada: ${accion}`)
    }
    catch(error){
        console.log(`Error al registrar auditoría. Error: ${error}`)
    }
};
