const express = require("express")
const router = express.Router()

// Ruta: Categorías (SIN Bootstrap modals)
router.get("/admin/categorias", (req, res) => {
    res.render("categorias_simple")
});

// Ruta: Productos
router.get("/admin/productos", (req, res) => {
    res.render("productos_full")
});

// Ruta: Usuarios
router.get("/admin/usuarios", (req, res) => {
    res.render("usuarios_full")
});

module.exports = router
