const express = require("express");
const router = express.Router();
const orderController = require("../controllers/OrderController");

/**
 * @swagger
 * tags:
 *   name: Órdenes
 *   description: Gestión de pedidos y órdenes de compra
 */

/**
 * @swagger
 * /api/ordenes:
 *   get:
 *     summary: Listar todas las órdenes
 *     tags: [Órdenes]
 *     responses:
 *       200:
 *         description: Lista de órdenes
 */
router.get("/ordenes", orderController.listar);

/**
 * @swagger
 * /api/ordenes/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener órdenes de un usuario
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Órdenes del usuario
 */
router.get("/ordenes/usuario/:usuarioId", orderController.listarPorUsuario);

/**
 * @swagger
 * /api/ordenes/{id}:
 *   get:
 *     summary: Obtener una orden por ID
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles de la orden
 *       404:
 *         description: Orden no encontrada
 */
router.get("/ordenes/:id", orderController.buscar);

/**
 * @swagger
 * /api/ordenes/crear:
 *   post:
 *     summary: Crear nueva orden
 *     tags: [Órdenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - items
 *             properties:
 *               usuario:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     producto:
 *                       type: string
 *                     cantidad:
 *                       type: number
 *               datos_envio:
 *                 type: object
 *               metodo_pago:
 *                 type: string
 *     responses:
 *       200:
 *         description: Orden creada exitosamente
 */
router.post("/ordenes/crear", orderController.crear);

/**
 * @swagger
 * /api/ordenes/estado/{id}:
 *   put:
 *     summary: Actualizar estado de la orden
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               estado:
 *                 type: string
 *                 enum: [pendiente, procesando, enviado, entregado, cancelado]
 *     responses:
 *       200:
 *         description: Estado actualizado
 */
router.put("/ordenes/estado/:id", orderController.actualizarEstado);

/**
 * @swagger
 * /api/ordenes/cancelar/{id}:
 *   put:
 *     summary: Cancelar orden
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden cancelada
 */
router.put("/ordenes/cancelar/:id", orderController.cancelar);

/**
 * @swagger
 * /api/ordenes/borrar/{id}:
 *   delete:
 *     summary: Eliminar orden (solo admin)
 *     tags: [Órdenes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Orden eliminada
 */
router.delete("/ordenes/borrar/:id", orderController.borrar);

module.exports = router;
