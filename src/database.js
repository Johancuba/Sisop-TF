/*
REF:
https://www.npmjs.com/package/mongoose
*/
const mongoose = require("mongoose")

// Env DEV o PROD con Docker
const dbURL = process.env.NODE_ENV === 'production' 
    ? "mongodb://mongo:27017/adminia_db"
    : 'mongodb://localhost:27017/adminia_db'

mongoose.connect(dbURL)

.then(() => console.log('DB Connected!'))
.catch(err => console.log("Error de Conexion: " + err))