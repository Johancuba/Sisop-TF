const userModel = require("../models/User");
const bcrypt = require('bcryptjs');

// Mostrar página de login
module.exports.mostrarLogin = (req, res) => {
    if (req.session && req.session.usuario) {
        // Redirección inteligente por rol
        if (req.session.usuario.rol === 'admin') {
            return res.redirect('/dashboard');
        } else {
            return res.redirect('/catalogo');
        }
    }
    res.render('login', { error: null });
};

// Procesar login
module.exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Buscar usuario por email
        const usuario = await userModel.findOne({ email, activo: true });
        
        if (!usuario) {
            return res.render('login', { error: 'Credenciales inválidas' });
        }
        
        // Comparar contraseña
        const passwordValida = await bcrypt.compare(password, usuario.password);
        
        if (!passwordValida) {
            return res.render('login', { error: 'Credenciales inválidas' });
        }
        
        // Crear sesión
        req.session.usuario = {
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            rol: usuario.rol
        };
        
        // Redirección inteligente por rol
        if (usuario.rol === 'admin') {
            res.redirect('/dashboard');
        } else {
            res.redirect('/catalogo');
        }
    } catch (error) {
        console.error('Error en login:', error);
        res.render('login', { error: 'Error al iniciar sesión' });
    }
};

// Cerrar sesión
module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error al cerrar sesión:', err);
        }
        res.redirect('/login');
    });
};

// Obtener usuario actual
module.exports.usuarioActual = (req, res) => {
    if (req.session && req.session.usuario) {
        res.json({ success: true, data: req.session.usuario });
    } else {
        res.json({ success: false, message: 'No autenticado' });
    }
};

// Mostrar página de registro
module.exports.mostrarRegistro = (req, res) => {
    if (req.session && req.session.usuario) {
        // Redirección inteligente por rol
        if (req.session.usuario.rol === 'admin') {
            return res.redirect('/dashboard');
        } else {
            return res.redirect('/catalogo');
        }
    }
    res.render('register', { error: null, success: null });
};

// Procesar registro
module.exports.registro = async (req, res) => {
    try {
        const { nombre, email, password, password_confirm } = req.body;
        
        // Validar que las contraseñas coincidan
        if (password !== password_confirm) {
            return res.render('register', { 
                error: 'Las contraseñas no coinciden',
                success: null 
            });
        }
        
        // Validar longitud de contraseña
        if (password.length < 6) {
            return res.render('register', { 
                error: 'La contraseña debe tener al menos 6 caracteres',
                success: null 
            });
        }
        
        // Verificar si el email ya existe
        const usuarioExiste = await userModel.findOne({ email });
        if (usuarioExiste) {
            return res.render('register', { 
                error: 'Este email ya está registrado',
                success: null 
            });
        }
        
        // Crear usuario con rol 'editor' por defecto
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const nuevoUsuario = new userModel({
            nombre,
            email,
            password: hashedPassword,
            rol: 'editor', // Los usuarios registrados son editores por defecto
            activo: true
        });
        
        await nuevoUsuario.save();
        
        // Redirigir al login con mensaje de éxito
        res.render('login', { 
            error: null,
            success: '¡Registro exitoso! Ahora puedes iniciar sesión'
        });
        
    } catch (error) {
        console.error('Error en registro:', error);
        res.render('register', { 
            error: 'Error al crear la cuenta. Intenta de nuevo.',
            success: null 
        });
    }
};
