/*
REF:
https://www.npmjs.com/package/mongoose
*/
const mongoose = require("mongoose")

// Conexión a MongoDB en Docker
const dbURL = process.env.MONGODB_URI || "mongodb://mongo:27017/adminia_db"

mongoose.connect(dbURL)
.then(() => console.log('DB Connected!'))
.catch(err => console.log("Error de Conexion: " + err))