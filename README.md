# Adminia - CMS para PYMES

**Adminia** es una plataforma web (CMS ligero) diseñada para que PYMES gestionen sus contenidos digitales de manera centralizada y automatizada. Es una alternativa simplificada a sistemas como PrestaShop.

## 🎯 Objetivo
Facilitar la administración de:
- **Productos** (con inventario, descripción, metadatos e imágenes)
- **Usuarios** (administradores con permisos)

## 🏗️ Arquitectura
- **Backend:** Node.js + Express (API REST)
- **Base de Datos:** MongoDB (persistencia con volúmenes Docker)
- **Orquestación:** Docker Compose

## 📁 Estructura del Proyecto
```
adminia/
├── src/
│   ├── controllers/        # Lógica de negocio (CRUD)
│   │   ├── AlumnoController.js
│   │   ├── ProductoController.js
│   │   └── UsuarioController.js
│   ├── models/             # Esquemas de MongoDB
│   │   ├── AlumnoModel.js
│   │   ├── ProductoModel.js
│   │   └── UsuarioModel.js
│   ├── routes/             # Definición de endpoints
│   │   ├── AlumnoRoute.js
│   │   ├── ProductoRoute.js
│   │   └── UsuarioRoute.js
│   ├── views/              # Plantillas EJS
│   ├── public/             # Archivos estáticos
│   ├── database.js         # Conexión a MongoDB
│   └── index.js            # Punto de entrada
├── Dockerfile              # Imagen Docker de la API
├── docker-compose.yml      # Orquestación de servicios
└── package.json
```

## 🚀 Instalación y Uso

### Opción 1: Desarrollo Local (sin Docker)
```bash
# 1. Instalar dependencias
npm install

# 2. Asegúrate de tener MongoDB corriendo localmente
# (en puerto 27017)

# 3. Ejecutar en modo desarrollo
npm run dev
```

### Opción 2: Producción con Docker (Recomendado)
```bash
# Levantar todos los servicios (API + MongoDB)
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener servicios
docker-compose down
```

La API estará disponible en: `http://localhost:3000`

## 📌 Endpoints de la API

### Productos
- `GET /api/productos` - Listar todos los productos
- `POST /api/productos/crear` - Crear nuevo producto
- `PUT /api/productos/editar/:id` - Actualizar producto
- `DELETE /api/productos/borrar/:id` - Eliminar producto

**Ejemplo de body para crear producto:**
```json
{
  "nombre": "Laptop HP",
  "descripcion": "Laptop para oficina",
  "precio": 599.99,
  "inventario": 10,
  "metadatos": "categoria:electronica,marca:hp",
  "imagenes_urls": ["https://example.com/img1.jpg"]
}
```

### Usuarios
- `GET /api/usuarios` - Listar todos los usuarios
- `POST /api/usuarios/crear` - Crear nuevo usuario
- `PUT /api/usuarios/editar/:id` - Actualizar usuario
- `DELETE /api/usuarios/borrar/:id` - Eliminar usuario

**Ejemplo de body para crear usuario:**
```json
{
  "nombre": "Admin Principal",
  "email": "admin@adminia.com",
  "password": "securepass123",
  "rol": "admin"
}
```

## 🔧 Tecnologías Utilizadas
- **Node.js** v18
- **Express** v4.18
- **MongoDB** v7.0
- **Mongoose** v8.0
- **EJS** v3.1 (Motor de plantillas)
- **Docker** & **Docker Compose**

## 🗄️ Persistencia de Datos
Los datos de MongoDB se persisten en un volumen Docker (`mongo_data`), por lo que no se pierden al reiniciar los contenedores.

## 📝 Notas del Desarrollo
- El código mantiene el estilo y arquitectura del ejemplo base del profesor
- No se introdujeron patrones complejos (Clean Architecture, Hexagonal, etc.)
- La estructura es simple, funcional y escalable para PYMES
- Se conservó la nomenclatura y convenciones del código original

## 👨‍💻 Autor
Proyecto desarrollado como extensión del ejemplo base del curso de Sistemas Operativos.

---
**Adminia** - Simplificando la gestión digital para PYMES 🚀
