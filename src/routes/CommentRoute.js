const express = require("express");
const router = express.Router();
const commentController = require("../controllers/CommentController");

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: Gestión de comentarios en posts
 */

/**
 * @swagger
 * /api/comentarios/post/{postId}:
 *   get:
 *     summary: Listar comentarios de un post
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentarios del post
 */
router.get("/comentarios/post/:postId", commentController.listarPorPost);

/**
 * @swagger
 * /api/comentarios/crear:
 *   post:
 *     summary: Crear un comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - post
 *               - usuario
 *               - contenido
 *             properties:
 *               post:
 *                 type: string
 *               usuario:
 *                 type: string
 *               contenido:
 *                 type: string
 *               respuesta_a:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario creado
 */
router.post("/comentarios/crear", commentController.crear);

/**
 * @swagger
 * /api/comentarios/like/{id}:
 *   put:
 *     summary: Dar/quitar like a un comentario
 *     tags: [Comentarios]
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
 *             required:
 *               - usuarioId
 *             properties:
 *               usuarioId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Like procesado
 */
router.put("/comentarios/like/:id", commentController.toggleLike);

/**
 * @swagger
 * /api/comentarios/editar/{id}:
 *   put:
 *     summary: Editar un comentario
 *     tags: [Comentarios]
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
 *             required:
 *               - contenido
 *             properties:
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado
 */
router.put("/comentarios/editar/:id", commentController.editar);

/**
 * @swagger
 * /api/comentarios/ocultar/{id}:
 *   put:
 *     summary: Ocultar un comentario (moderación)
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario ocultado
 */
router.put("/comentarios/ocultar/:id", commentController.ocultar);

/**
 * @swagger
 * /api/comentarios/borrar/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado
 */
router.delete("/comentarios/borrar/:id", commentController.borrar);

module.exports = router;
