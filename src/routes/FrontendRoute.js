const express = require("express")
const router = express.Router()
const { isAuthenticated, isAdmin } = require("../middleware/auth")

// Ruta: Categorías (requiere login)
router.get("/admin/categorias", isAuthenticated, (req, res) => {
    res.render("categorias_simple", { usuario: req.session.usuario })
});

// Ruta: Productos (requiere login)
router.get("/admin/productos", isAuthenticated, (req, res) => {
    res.render("productos_simple", { usuario: req.session.usuario })
});

// Ruta: Usuarios (solo admin)
router.get("/admin/usuarios", isAuthenticated, isAdmin, (req, res) => {
    res.render("usuarios_simple", { usuario: req.session.usuario })
});

module.exports = router
