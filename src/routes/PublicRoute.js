const express = require("express");
const router = express.Router();
const productModel = require("../models/Product");

// Catálogo público de productos
router.get("/catalogo", async (req, res) => {
    try {
        const usuario = req.session && req.session.usuario ? req.session.usuario : null;
        res.render("catalogo", { usuario });
    } catch (error) {
        console.error("Error al cargar catálogo:", error);
        res.status(500).send("Error al cargar el catálogo");
    }
});

// Detalle de producto público
router.get("/producto/:id", async (req, res) => {
    try {
        const producto = await productModel.findById(req.params.id)
            .populate('categoria')
            .exec();
        
        const usuario = req.session && req.session.usuario ? req.session.usuario : null;
        
        if (!producto || !producto.activo) {
            return res.render("producto_detalle", { producto: null, usuario });
        }
        
        res.render("producto_detalle", { producto, usuario });
    } catch (error) {
        console.error("Error al cargar producto:", error);
        const usuario = req.session && req.session.usuario ? req.session.usuario : null;
        res.render("producto_detalle", { producto: null, usuario });
    }
});

module.exports = router;
