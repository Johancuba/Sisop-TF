const express = require("express")
const router = express.Router()

const userController = require("../controllers/UserController")

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios (sin passwords)
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/usuarios", userController.mostrar)

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get("/usuarios/:id", userController.mostrarPorId)

/**
 * @swagger
 * /usuarios/crear:
 *   post:
 *     summary: Crear nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan@adminia.com
 *               password:
 *                 type: string
 *                 example: admin123
 *               rol:
 *                 type: string
 *                 enum: [admin, editor]
 *                 example: admin
 *     responses:
 *       200:
 *         description: Usuario creado
 *       400:
 *         description: Email ya existe
 */
router.post("/usuarios/crear", userController.crear)

/**
 * @swagger
 * /usuarios/editar/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado
 */
router.put("/usuarios/editar/:id", userController.editar)

/**
 * @swagger
 * /usuarios/borrar/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */
router.delete("/usuarios/borrar/:id", userController.borrar);

module.exports = router


