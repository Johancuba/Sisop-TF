const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");

// Rutas de autenticación
router.get("/login", authController.mostrarLogin);
router.post("/login", authController.login);
router.get("/logout", authController.logout);
router.get("/api/auth/usuario-actual", authController.usuarioActual);

// Rutas de registro
router.get("/register", authController.mostrarRegistro);
router.post("/register", authController.registro);

module.exports = router;
