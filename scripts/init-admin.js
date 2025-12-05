// Script para crear usuario administrador inicial
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo:27017/adminia_db';

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: String, enum: ['admin', 'editor'], default: 'admin' },
    activo: { type: Boolean, default: true }
}, { collection: 'usuarios', timestamps: true });

const User = mongoose.model('User', userSchema);

async function crearAdminInicial() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('✅ Conectado a MongoDB');

        // Verificar si ya existe un admin
        const adminExiste = await User.findOne({ email: 'admin@adminia.com' });
        
        if (adminExiste) {
            console.log('ℹ️  Usuario admin ya existe');
            process.exit(0);
        }

        // Crear admin inicial
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const admin = new User({
            nombre: 'Administrador',
            email: 'admin@adminia.com',
            password: hashedPassword,
            rol: 'admin',
            activo: true
        });

        await admin.save();
        console.log('✅ Usuario admin creado exitosamente');
        console.log('📧 Email: admin@adminia.com');
        console.log('🔑 Password: admin123');
        
        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
}

crearAdminInicial();
