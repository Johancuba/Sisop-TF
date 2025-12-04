const express = require("express")
const router = express.Router()

const productController = require("../controllers/ProductController")

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener todos los productos (con populate de categoría)
 *     tags: [Productos]
 *     description: Retorna productos con imágenes y metadatos embebidos en un solo documento NoSQL
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Product'
 */
router.get("/productos", productController.mostrar)

/**
 * @swagger
 * /productos/{id}:
 *   get:
 *     summary: Obtener un producto por ID
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto encontrado con todos sus datos embebidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Producto no encontrado
 */
router.get("/productos/:id", productController.mostrarPorId)

/**
 * @swagger
 * /productos/crear:
 *   post:
 *     summary: Crear nuevo producto (NoSQL con embebidos)
 *     tags: [Productos]
 *     description: Crea producto con imágenes y metadatos embebidos en un solo documento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - precio
 *               - stock
 *               - sku
 *               - categoria
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Laptop HP Pavilion 15
 *               descripcion:
 *                 type: string
 *                 example: Laptop ideal para trabajo
 *               precio:
 *                 type: number
 *                 example: 899.99
 *               stock:
 *                 type: number
 *                 example: 15
 *               sku:
 *                 type: string
 *                 example: LAP-HP-001
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/img1.jpg", "https://example.com/img2.jpg"]
 *               metadatos:
 *                 type: object
 *                 properties:
 *                   marca:
 *                     type: string
 *                     example: HP
 *                   modelo:
 *                     type: string
 *                     example: Pavilion 15
 *                   peso:
 *                     type: string
 *                     example: 1.75 kg
 *                   garantia:
 *                     type: string
 *                     example: 1 año
 *                   otros:
 *                     type: object
 *                     example: { "procesador": "Intel i5", "ram": "8GB" }
 *               categoria:
 *                 type: string
 *                 example: 6931e77b446e02d3e84794b7
 *     responses:
 *       200:
 *         description: Producto creado exitosamente
 *       400:
 *         description: Error de validación o categoría inválida
 */
router.post("/productos/crear", productController.crear)

/**
 * @swagger
 * /productos/editar/{id}:
 *   put:
 *     summary: Actualizar producto existente
 *     tags: [Productos]
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
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *               stock:
 *                 type: number
 *               imagenes:
 *                 type: array
 *                 items:
 *                   type: string
 *               metadatos:
 *                 type: object
 *               categoria:
 *                 type: string
 *     responses:
 *       200:
 *         description: Producto actualizado
 *       404:
 *         description: Producto no encontrado
 */
router.put("/productos/editar/:id", productController.editar)

/**
 * @swagger
 * /productos/borrar/{id}:
 *   delete:
 *     summary: Borrado lógico de producto (marca como inactivo)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto desactivado
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/productos/borrar/:id", productController.borrar);

/**
 * @swagger
 * /productos/eliminar/{id}:
 *   delete:
 *     summary: Borrado físico de producto (elimina permanentemente)
 *     tags: [Productos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Producto eliminado permanentemente
 *       404:
 *         description: Producto no encontrado
 */
router.delete("/productos/eliminar/:id", productController.borrarFisico);

module.exports = router


