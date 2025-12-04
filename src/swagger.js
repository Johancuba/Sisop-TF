const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Adminia API - CMS para PYMES',
      version: '1.0.0',
      description: 'API REST NoSQL para gestión de contenidos digitales (Productos, Categorías, Usuarios). Implementa MongoDB con documentos embebidos para máximo performance.',
      contact: {
        name: 'Equipo Adminia',
        email: 'contacto@adminia.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desarrollo'
      },
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Producción (Docker)'
      }
    ],
    tags: [
      {
        name: 'Categorías',
        description: 'Gestión de categorías de productos'
      },
      {
        name: 'Productos',
        description: 'CRUD de productos con imágenes y metadatos embebidos (NoSQL)'
      },
      {
        name: 'Usuarios',
        description: 'Administración de usuarios del sistema'
      },
      {
        name: 'Auditorías',
        description: 'Logs y auditoría del sistema'
      }
    ],
    components: {
      schemas: {
        Category: {
          type: 'object',
          required: ['nombre'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de MongoDB',
              example: '6931e77b446e02d3e84794b7'
            },
            nombre: {
              type: 'string',
              description: 'Nombre de la categoría',
              example: 'Electrónica'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción de la categoría',
              example: 'Dispositivos electrónicos y computadoras'
            },
            activo: {
              type: 'boolean',
              description: 'Estado de la categoría',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['titulo', 'descripcion', 'precio', 'stock', 'sku', 'categoria'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de MongoDB',
              example: '6931e786446e02d3e84794ba'
            },
            titulo: {
              type: 'string',
              description: 'Título del producto',
              example: 'Laptop HP Pavilion 15'
            },
            descripcion: {
              type: 'string',
              description: 'Descripción detallada',
              example: 'Laptop ideal para trabajo. Procesador Intel i5'
            },
            precio: {
              type: 'number',
              description: 'Precio del producto',
              example: 899.99
            },
            stock: {
              type: 'number',
              description: 'Cantidad en inventario',
              example: 15
            },
            sku: {
              type: 'string',
              description: 'Código SKU único',
              example: 'LAP-HP-001'
            },
            imagenes: {
              type: 'array',
              description: 'Array de URLs de imágenes (embebido)',
              items: {
                type: 'string'
              },
              example: ['https://example.com/img1.jpg', 'https://example.com/img2.jpg']
            },
            metadatos: {
              type: 'object',
              description: 'Metadatos flexibles del producto (embebido)',
              properties: {
                marca: { type: 'string', example: 'HP' },
                modelo: { type: 'string', example: 'Pavilion 15' },
                peso: { type: 'string', example: '1.75 kg' },
                dimensiones: { type: 'string', example: '36x24x2 cm' },
                garantia: { type: 'string', example: '1 año' },
                otros: {
                  type: 'object',
                  description: 'Campos dinámicos adicionales',
                  example: { procesador: 'Intel i5', ram: '8GB', ssd: '256GB' }
                }
              }
            },
            categoria: {
              type: 'string',
              description: 'ID de la categoría (referencia)',
              example: '6931e77b446e02d3e84794b7'
            },
            activo: {
              type: 'boolean',
              description: 'Estado del producto',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        User: {
          type: 'object',
          required: ['nombre', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'ID único de MongoDB',
              example: '67506701e8f1234567890ghi'
            },
            nombre: {
              type: 'string',
              description: 'Nombre completo del usuario',
              example: 'Juan Pérez'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email único del usuario',
              example: 'juan.perez@adminia.com'
            },
            password: {
              type: 'string',
              description: 'Contraseña (no se devuelve en respuestas)',
              example: 'admin12345'
            },
            rol: {
              type: 'string',
              enum: ['admin', 'editor'],
              description: 'Rol del usuario',
              example: 'admin'
            },
            activo: {
              type: 'boolean',
              description: 'Estado del usuario',
              example: true
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Audit: {
          type: 'object',
          required: ['accion', 'usuario'],
          properties: {
            _id: {
              type: 'string',
              example: '67507a1e8f1234567890xyz'
            },
            accion: {
              type: 'string',
              description: 'Tipo de acción realizada',
              example: 'PRODUCTO_CREADO'
            },
            usuario: {
              type: 'string',
              description: 'ID del usuario que realizó la acción',
              example: '67506701e8f1234567890ghi'
            },
            detalle: {
              type: 'object',
              description: 'Detalles adicionales de la acción',
              example: { producto_id: '6931e786446e02d3e84794ba', titulo: 'Laptop HP' }
            },
            fecha: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error al procesar la solicitud'
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            data: {
              type: 'object',
              description: 'Datos de respuesta'
            },
            message: {
              type: 'string',
              example: 'Operación exitosa'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js'], // Path a los archivos de rutas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
