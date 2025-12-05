const express = require("express");
const router = express.Router();
const cartController = require("../controllers/CartController");

/**
 * @swagger
 * tags:
 *   name: Carrito
 *   description: Gestión del carrito de compras
 */

/**
 * @swagger
 * /api/carrito/{usuarioId}:
 *   get:
 *     summary: Obtener carrito del usuario
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito del usuario
 */
router.get("/carrito/:usuarioId", cartController.obtenerCarrito);

/**
 * @swagger
 * /api/carrito/agregar:
 *   post:
 *     summary: Agregar producto al carrito
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - productoId
 *               - cantidad
 *             properties:
 *               usuarioId:
 *                 type: string
 *               productoId:
 *                 type: string
 *               cantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Producto agregado al carrito
 */
router.post("/carrito/agregar", cartController.agregarItem);

/**
 * @swagger
 * /api/carrito/actualizar:
 *   put:
 *     summary: Actualizar cantidad de un producto en el carrito
 *     tags: [Carrito]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuarioId
 *               - productoId
 *               - cantidad
 *             properties:
 *               usuarioId:
 *                 type: string
 *               productoId:
 *                 type: string
 *               cantidad:
 *                 type: number
 *     responses:
 *       200:
 *         description: Cantidad actualizada
 */
router.put("/carrito/actualizar", cartController.actualizarItem);

/**
 * @swagger
 * /api/carrito/eliminar/{usuarioId}/{productoId}:
 *   delete:
 *     summary: Eliminar producto del carrito
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: productoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado
 */
router.delete("/carrito/eliminar/:usuarioId/:productoId", cartController.eliminarItem);

/**
 * @swagger
 * /api/carrito/vaciar/{usuarioId}:
 *   delete:
 *     summary: Vaciar todo el carrito
 *     tags: [Carrito]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Carrito vaciado
 */
router.delete("/carrito/vaciar/:usuarioId", cartController.vaciarCarrito);

module.exports = router;
