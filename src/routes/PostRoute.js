const express = require("express");
const router = express.Router();
const postController = require("../controllers/PostController");

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: Sistema de publicaciones y red social
 */

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: Listar todos los posts (feed público)
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Feed de posts
 */
router.get("/posts", postController.listar);

/**
 * @swagger
 * /api/posts/destacados:
 *   get:
 *     summary: Obtener posts destacados
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Posts destacados
 */
router.get("/posts/destacados", postController.destacados);

/**
 * @swagger
 * /api/posts/usuario/{usuarioId}:
 *   get:
 *     summary: Obtener posts de un usuario
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: usuarioId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts del usuario
 */
router.get("/posts/usuario/:usuarioId", postController.listarPorUsuario);

/**
 * @swagger
 * /api/posts/tag/{tag}:
 *   get:
 *     summary: Buscar posts por tag
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: tag
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Posts con el tag especificado
 */
router.get("/posts/tag/:tag", postController.buscarPorTag);

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: Obtener un post por ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Detalles del post
 */
router.get("/posts/:id", postController.buscar);

/**
 * @swagger
 * /api/posts/crear:
 *   post:
 *     summary: Crear un nuevo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario
 *               - titulo
 *               - descripcion
 *             properties:
 *               usuario:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 enum: [promocion, novedad, contenido, producto_destacado]
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: string
 *               producto_relacionado:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Post creado
 */
router.post("/posts/crear", postController.crear);

/**
 * @swagger
 * /api/posts/editar/{id}:
 *   put:
 *     summary: Editar un post
 *     tags: [Posts]
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
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               destacado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Post actualizado
 */
router.put("/posts/editar/:id", postController.editar);

/**
 * @swagger
 * /api/posts/like/{id}:
 *   put:
 *     summary: Dar/quitar like a un post
 *     tags: [Posts]
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
router.put("/posts/like/:id", postController.toggleLike);

/**
 * @swagger
 * /api/posts/borrar/{id}:
 *   delete:
 *     summary: Eliminar un post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post eliminado
 */
router.delete("/posts/borrar/:id", postController.borrar);

module.exports = router;
