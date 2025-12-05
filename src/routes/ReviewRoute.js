const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/ReviewController");

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Gestión de reseñas de productos
 */

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: Listar todas las reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: Lista de reviews
 */
router.get("/reviews", reviewController.listar);

/**
 * @swagger
 * /api/reviews/producto/{productoId}:
 *   get:
 *     summary: Obtener reviews de un producto
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: productoId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Reviews del producto con estadísticas
 */
router.get("/reviews/producto/:productoId", reviewController.listarPorProducto);

/**
 * @swagger
 * /api/reviews/crear:
 *   post:
 *     summary: Crear una nueva review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - producto
 *               - usuario
 *               - calificacion
 *               - titulo
 *               - comentario
 *             properties:
 *               producto:
 *                 type: string
 *               usuario:
 *                 type: string
 *               calificacion:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *               titulo:
 *                 type: string
 *               comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Review creada
 */
router.post("/reviews/crear", reviewController.crear);

/**
 * @swagger
 * /api/reviews/aprobar/{id}:
 *   put:
 *     summary: Aprobar una review (solo admin)
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review aprobada
 */
router.put("/reviews/aprobar/:id", reviewController.aprobar);

/**
 * @swagger
 * /api/reviews/util/{id}:
 *   put:
 *     summary: Marcar review como útil
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review marcada
 */
router.put("/reviews/util/:id", reviewController.marcarUtil);

/**
 * @swagger
 * /api/reviews/borrar/{id}:
 *   delete:
 *     summary: Eliminar una review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Review eliminada
 */
router.delete("/reviews/borrar/:id", reviewController.borrar);

module.exports = router;
