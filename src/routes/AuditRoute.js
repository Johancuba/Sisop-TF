const express = require("express")
const router = express.Router()

const auditController = require("../controllers/AuditController")

/**
 * @swagger
 * /auditorias:
 *   get:
 *     summary: Obtener todas las auditorías
 *     tags: [Auditorías]
 *     responses:
 *       200:
 *         description: Lista de auditorías con populate de usuario
 */
router.get("/auditorias", auditController.mostrar)

/**
 * @swagger
 * /auditorias/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener auditorías por usuario
 *     tags: [Auditorías]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Auditorías del usuario
 */
router.get("/auditorias/usuario/:usuarioId", auditController.mostrarPorUsuario)

/**
 * @swagger
 * /auditorias/crear:
 *   post:
 *     summary: Registrar nueva auditoría
 *     tags: [Auditorías]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - accion
 *               - usuario
 *             properties:
 *               accion:
 *                 type: string
 *                 example: PRODUCTO_CREADO
 *               usuario:
 *                 type: string
 *                 example: 67506701e8f1234567890ghi
 *               detalle:
 *                 type: object
 *                 example: { "producto_id": "123", "titulo": "Laptop" }
 *     responses:
 *       200:
 *         description: Auditoría registrada
 */
router.post("/auditorias/crear", auditController.crear)

module.exports = router


