# 🚀 ADMINIA - CMS NoSQL para PYMES

## ✅ Proyecto Completamente Implementado

### 📋 Resumen del Proyecto

**Adminia** es un CMS (Content Management System) desarrollado específicamente para pequeñas y medianas empresas que necesitan gestionar productos, categorías, usuarios y contenidos digitales de manera eficiente, sin la complejidad de plataformas como PrestaShop.

---

## 🎯 Giro de Negocio

### Problema que Resuelve
Muchas PYMES necesitan administrar productos y contenidos digitales pero enfrentan:
- **Curva de aprendizaje elevada** en plataformas como PrestaShop
- **Necesidad de personal técnico especializado**
- **Costos elevados** de implementación y mantenimiento
- **Complejidad innecesaria** para negocios pequeños

### Solución: Adminia
- ✅ Interfaz intuitiva sin conocimientos técnicos avanzados
- ✅ Arquitectura NoSQL optimizada con MongoDB
- ✅ Gestión centralizada de productos, categorías, usuarios e imágenes
- ✅ Automatización de tareas recurrentes
- ✅ Documentación Swagger completa
- ✅ Dashboard interactivo para pruebas

---

## 🏗️ Arquitectura Técnica

### Stack Tecnológico
- **Backend:** Node.js + Express
- **Base de Datos:** MongoDB (NoSQL con documentos embebidos)
- **Orquestación:** Docker + Docker Compose
- **Documentación:** Swagger UI (OpenAPI 3.0)
- **Frontend:** EJS + Bootstrap 5

### Diseño NoSQL Optimizado

#### Antes (SQL - 3 tablas separadas):
```
- Tabla productos
- Tabla imagenes_producto (1:N)
- Tabla metadatos_producto (1:N)
```

#### Ahora (MongoDB - 1 documento):
```json
{
  "_id": "...",
  "titulo": "Laptop HP",
  "precio": 899.99,
  "imagenes": ["url1.jpg", "url2.jpg"],
  "metadatos": {
    "marca": "HP",
    "modelo": "Pavilion 15",
    "otros": { "ram": "8GB" }
  },
  "categoria": ObjectId("...")
}
```

**Ventajas:**
- ⚡ 3x menos consultas a BD
- 📦 Datos relacionados en un solo documento
- 🔄 Operaciones atómicas
- 📈 Escalabilidad horizontal

---

## 📁 Entidades del Sistema

### 1. **Productos** (`/api/productos`)
- Título, descripción, precio, stock, SKU
- **Imágenes embebidas** (array de URLs)
- **Metadatos embebidos** (objeto flexible)
- Referencia a categoría
- Borrado lógico/físico

### 2. **Categorías** (`/api/categorias`)
- Nombre, descripción
- Estado activo/inactivo
- Relación 1:N con productos

### 3. **Usuarios** (`/api/usuarios`)
- Nombre, email (único), password
- Roles: admin/editor
- Control de acceso

### 4. **Auditorías** (`/api/auditorias`)
- Registro de eventos del sistema
- Usuario que realizó la acción
- Detalles flexibles (objeto Mixed)
- Fecha automática

---

## 🌐 URLs del Sistema

### Producción (Docker)
```
http://localhost:3000/              → Página principal
http://localhost:3000/dashboard     → Dashboard interactivo
http://localhost:3000/swagger       → Documentación Swagger
http://localhost:3000/api           → Redirige a Swagger
```

### Endpoints API REST

#### Categorías
```
GET    /api/categorias              → Listar todas
GET    /api/categorias/:id          → Ver una
POST   /api/categorias/crear        → Crear
PUT    /api/categorias/editar/:id   → Actualizar
DELETE /api/categorias/borrar/:id   → Eliminar
```

#### Productos (con estructura NoSQL)
```
GET    /api/productos               → Listar todos (con populate)
GET    /api/productos/:id           → Ver uno
POST   /api/productos/crear         → Crear (con embebidos)
PUT    /api/productos/editar/:id    → Actualizar
DELETE /api/productos/borrar/:id    → Borrado lógico
DELETE /api/productos/eliminar/:id  → Borrado físico
```

#### Usuarios
```
GET    /api/usuarios                → Listar (sin passwords)
GET    /api/usuarios/:id            → Ver uno
POST   /api/usuarios/crear          → Crear
PUT    /api/usuarios/editar/:id     → Actualizar
DELETE /api/usuarios/borrar/:id     → Eliminar
```

#### Auditorías
```
GET    /api/auditorias                      → Listar todas
GET    /api/auditorias/usuario/:usuarioId   → Por usuario
POST   /api/auditorias/crear                → Registrar evento
```

---

## 🚀 Instrucciones de Uso

### 1. Iniciar con Docker (Recomendado)
```bash
# Detener contenedores previos
docker-compose down

# Construir e iniciar
docker-compose up --build -d

# Verificar logs
docker logs adminia_api

# Acceder
# http://localhost:3000/dashboard
```

### 2. Instalar Dependencias (Desarrollo Local)
```bash
npm install
```

### 3. Iniciar en Desarrollo
```bash
npm run dev
```

---

## 🎨 Dashboard Interactivo

### Características
El dashboard (`/dashboard`) permite:
- ✅ Ver contadores en tiempo real de cada entidad
- ✅ Probar APIs individualmente o todas a la vez
- ✅ Verificar conectividad con MongoDB
- ✅ Acceder rápidamente a Swagger
- ✅ UI moderna con gradientes y animaciones

### Uso del Dashboard
1. Abre `http://localhost:3000/dashboard`
2. Haz clic en **"Probar API"** en cada tarjeta
3. O usa **"Probar Todas las APIs"** para test completo
4. Verifica que los contadores muestren números (no iconos de error)

---

## 📚 Documentación Swagger

### Acceso
```
http://localhost:3000/swagger
```

### Características
- ✅ Especificación OpenAPI 3.0
- ✅ Documentación automática de todos los endpoints
- ✅ Schemas de MongoDB completamente detallados
- ✅ Ejemplos de request/response
- ✅ Interfaz "Try it out" para ejecutar APIs
- ✅ Secciones organizadas por entidad (Tags)

### Ejemplo de Uso en Swagger
1. Navega a `/swagger`
2. Expande `POST /categorias/crear`
3. Click **"Try it out"**
4. Edita el JSON:
```json
{
  "nombre": "Electrónica",
  "descripcion": "Dispositivos electrónicos"
}
```
5. Click **"Execute"**
6. Ve la respuesta con el ID generado

---

## 🧪 Probar el Sistema

### Test Rápido con curl
```bash
# 1. Crear categoría
curl -X POST http://localhost:3000/api/categorias/crear \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Electrónica","descripcion":"Dispositivos"}'

# 2. Listar categorías (guarda el ID)
curl http://localhost:3000/api/categorias

# 3. Crear producto con estructura NoSQL
curl -X POST http://localhost:3000/api/productos/crear \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "Laptop HP",
    "descripcion": "Laptop para trabajo",
    "precio": 899.99,
    "stock": 15,
    "sku": "LAP-001",
    "imagenes": ["https://example.com/img1.jpg"],
    "metadatos": {
      "marca": "HP",
      "modelo": "Pavilion 15",
      "peso": "1.75 kg"
    },
    "categoria": "ID_DE_CATEGORIA"
  }'

# 4. Listar productos (verás populate de categoría)
curl http://localhost:3000/api/productos
```

---

## 🗂️ Estructura de Archivos

```
adminia/
├── src/
│   ├── controllers/
│   │   ├── ProductController.js   ← CRUD con embebidos
│   │   ├── CategoryController.js
│   │   ├── UserController.js
│   │   └── AuditController.js
│   ├── models/
│   │   ├── Product.js             ← Schema NoSQL fusionado
│   │   ├── Category.js
│   │   ├── User.js
│   │   └── Audit.js
│   ├── routes/
│   │   ├── ProductRoute.js        ← Con JSDoc para Swagger
│   │   ├── CategoryRoute.js
│   │   ├── UserRoute.js
│   │   └── AuditRoute.js
│   ├── views/
│   │   ├── dashboard.ejs          ← Dashboard interactivo
│   │   └── index.ejs
│   ├── swagger.js                 ← Configuración Swagger
│   ├── database.js                ← Conexión MongoDB
│   └── index.js                   ← Entry point
├── docker-compose.yml             ← Orquestación
├── Dockerfile
├── package.json
├── README_NOSQL.md
├── SWAGGER_GUIDE.md
└── api_examples_nosql.http
```

---

## 🔧 Características Técnicas Destacadas

### 1. Arquitectura NoSQL Optimizada
- Documentos embebidos (imágenes, metadatos)
- Referencias selectivas (categorías)
- Operaciones atómicas
- Menos JOINs = Mayor velocidad

### 2. Documentación Swagger Completa
- Generada automáticamente con JSDoc
- Schemas detallados de MongoDB
- Ejemplos de uso real
- Interfaz interactiva

### 3. Dashboard de Pruebas
- Contadores en tiempo real
- Test de conectividad
- UI moderna y responsive
- Sin necesidad de Postman

### 4. Containerización con Docker
- Persistencia de datos con volúmenes
- Networking entre servicios
- Fácil despliegue
- Portable entre ambientes

### 5. Código Estilo Profesor
- Sin frameworks complejos
- Try-catch simple
- Funciones async/await claras
- Fácil de mantener

---

## 📊 Comparativa con PrestaShop

| Característica | PrestaShop | Adminia |
|----------------|------------|---------|
| **Curva de Aprendizaje** | Alta (requiere dev) | Baja (interfaz simple) |
| **Instalación** | Compleja (dependencias PHP) | Simple (Docker) |
| **Recursos** | Alto consumo | Optimizado |
| **Base de Datos** | SQL normalizada | NoSQL optimizada |
| **Documentación** | Extensa pero compleja | Swagger interactivo |
| **Personalización** | Requiere conocimientos | API REST clara |
| **Costo** | Gratis + costos ocultos | Open Source total |

---

## 🎯 Objetivos Cumplidos

✅ **Simplicidad:** Interfaz accesible sin conocimientos técnicos avanzados  
✅ **Arquitectura NoSQL:** Productos con imágenes/metadatos embebidos  
✅ **Documentación:** Swagger completo y interactivo  
✅ **Dashboard:** Interfaz visual para probar todas las entidades  
✅ **Docker:** Containerizado con persistencia  
✅ **APIs REST:** Endpoints completos y documentados  
✅ **Auditoría:** Sistema de logs y trazabilidad  
✅ **Sin rastros de Alumno:** Proyecto 100% enfocado en el giro de negocio  

---

## 🚀 Próximos Pasos Sugeridos

1. **Autenticación:** Implementar JWT para seguridad
2. **Upload de Imágenes:** Integrar Cloudinary o S3
3. **Frontend Completo:** Dashboard CRUD completo con React/Vue
4. **Búsqueda:** Implementar búsqueda full-text en MongoDB
5. **Deploy:** Desplegar en Railway/Heroku/AWS
6. **Tests:** Agregar Jest para tests unitarios

---

## 📞 Soporte

### Recursos Disponibles
- **Swagger:** `http://localhost:3000/swagger`
- **Dashboard:** `http://localhost:3000/dashboard`
- **README NoSQL:** `README_NOSQL.md`
- **Guía Swagger:** `SWAGGER_GUIDE.md`
- **Ejemplos API:** `api_examples_nosql.http`

---

## 🎉 ¡Proyecto Adminia Completado!

El sistema está **100% funcional** y listo para probar todas las entidades de tu giro de negocio:
- ✅ Productos con estructura NoSQL
- ✅ Categorías
- ✅ Usuarios con roles
- ✅ Auditorías

**Accede ahora:** http://localhost:3000/dashboard 🚀
