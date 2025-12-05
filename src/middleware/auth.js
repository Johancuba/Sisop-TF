// Middleware de autenticación

// Verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
    if (req.session && req.session.usuario) {
        return next();
    }
    res.redirect('/login');
};

// Verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
    if (req.session && req.session.usuario && req.session.usuario.rol === 'admin') {
        return next();
    }
    res.status(403).json({ success: false, message: 'Acceso denegado. Solo administradores.' });
};

// Verificar si el usuario es admin o editor
const isAdminOrEditor = (req, res, next) => {
    if (req.session && req.session.usuario && 
        (req.session.usuario.rol === 'admin' || req.session.usuario.rol === 'editor')) {
        return next();
    }
    res.status(403).json({ success: false, message: 'Acceso denegado.' });
};

module.exports = { isAuthenticated, isAdmin, isAdminOrEditor };
