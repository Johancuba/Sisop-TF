# Adminia - CMS NoSQL para PYMES 🚀

**Adminia** es una plataforma web (CMS ligero) diseñada para PYMES, implementada con arquitectura **NoSQL** optimizada para MongoDB. Transforma la lógica relacional SQL en documentos embebidos eficientes.

## 🎯 Transformación SQL → NoSQL

### ✨ Ventajas de la Arquitectura NoSQL Implementada:

| **Concepto** | **SQL (Antes)** | **NoSQL (Ahora)** |
|--------------|-----------------|-------------------|
| **Productos + Imágenes** | 2 tablas + JOIN | 1 documento con array embebido |
| **Productos + Metadatos** | 2 tablas + JOIN | 1 documento con objeto flexible |
| **Producto completo** | 3 queries separados | 1 query único |
| **Agregar campo** | ALTER TABLE necesario | Sin cambios de schema |
| **Consulta rápida** | Multiple JOINs lentos | Documento completo instantáneo |

---

## 🏗️ Arquitectura de Datos

### 1️⃣ **Product** (Documento Fusionado)
```javascript
{
  "_id": ObjectId("..."),
  "titulo": "Laptop HP",
  "descripcion": "...",
  "precio": 899.99,
  "stock": 15,
  "sku": "LAP-001",
  
  // FUSIÓN: Imágenes embebidas (antes tabla separada)
  "imagenes": [
    "url1.jpg",
    "url2.jpg",
    "url3.jpg"
  ],
  
  // FUSIÓN: Metadatos flexibles (antes tabla separada)
  "metadatos": {
    "marca": "HP",
    "modelo": "Pavilion",
    "peso": "1.75 kg",
    "otros": { ... }  // Campos dinámicos
  },
  
  // REFERENCIA: Categoría (mantiene normalización)
  "categoria": ObjectId("..."),
  
  "activo": true,
  "createdAt": ISODate("..."),
  "updatedAt": ISODate("...")
}
```

### 2️⃣ **Category** (Referencia)
```javascript
{
  "_id": ObjectId("..."),
  "nombre": "Electrónica",
  "descripcion": "...",
  "activo": true
}
```

### 3️⃣ **User** (Seguridad)
```javascript
{
  "_id": ObjectId("..."),
  "nombre": "Admin",
  "email": "admin@adminia.com",
  "password": "hash...",
  "rol": "admin",  // enum: admin, editor
  "activo": true
}
```

### 4️⃣ **Audit** (Logs con referencia)
```javascript
{
  "_id": ObjectId("..."),
  "accion": "PRODUCTO_CREADO",
  "usuario": ObjectId("..."),  // ref: users
  "detalle": { ... },
  "fecha": ISODate("...")
}
```

---

## 📁 Estructura del Proyecto

```
adminia/
├── src/
│   ├── controllers/
│   │   ├── AlumnoController.js   # Ejemplo del profesor (referencia)
│   │   ├── ProductController.js  # ✨ NoSQL con embebidos
│   │   ├── CategoryController.js
│   │   ├── UserController.js
│   │   └── AuditController.js
│   ├── models/
│   │   ├── AlumnoModel.js        # Ejemplo del profesor
│   │   ├── Product.js            # ✨ Schema fusionado
│   │   ├── Category.js
│   │   ├── User.js
│   │   └── Audit.js
│   ├── routes/
│   │   ├── AlumnoRoute.js
│   │   ├── ProductRoute.js       # ✨ Rutas NoSQL
│   │   ├── CategoryRoute.js
│   │   ├── UserRoute.js
│   │   └── AuditRoute.js
│   ├── database.js
│   └── index.js
├── Dockerfile
├── docker-compose.yml
├── api_examples_nosql.http       # ✨ Ejemplos NoSQL
└── package.json
```

---

## 🚀 Instalación y Uso

### Con Docker (Recomendado):
```bash
docker-compose up --build
```

### Desarrollo Local:
```bash
npm install
npm run dev
```

**API:** `http://localhost:3000`

---

## 📌 Endpoints API NoSQL

### **Categorías** (Crear primero)
```http
GET    /api/categorias              # Listar todas
GET    /api/categorias/:id          # Ver una
POST   /api/categorias/crear        # Crear
PUT    /api/categorias/editar/:id   # Actualizar
DELETE /api/categorias/borrar/:id   # Eliminar
```

### **Productos** (Con embebidos)
```http
GET    /api/productos               # Listar con populate
GET    /api/productos/:id           # Ver con metadatos e imágenes
POST   /api/productos/crear         # Crear con arrays embebidos
PUT    /api/productos/editar/:id    # Actualizar embebidos
DELETE /api/productos/borrar/:id    # Borrado lógico
DELETE /api/productos/eliminar/:id  # Borrado físico
```

### **Usuarios**
```http
GET    /api/usuarios                # Listar (sin passwords)
GET    /api/usuarios/:id            # Ver uno
POST   /api/usuarios/crear          # Crear
PUT    /api/usuarios/editar/:id     # Actualizar
DELETE /api/usuarios/borrar/:id     # Eliminar
```

### **Auditorías**
```http
GET    /api/auditorias                      # Listar todas
GET    /api/auditorias/usuario/:usuarioId  # Por usuario
POST   /api/auditorias/crear                # Registrar
```

---

## 🎨 Ejemplo de Request: Producto con Embebidos

```json
POST /api/productos/crear
{
  "titulo": "Laptop HP Pavilion 15",
  "descripcion": "Laptop ideal para trabajo",
  "precio": 899.99,
  "stock": 15,
  "sku": "LAP-HP-PAV-001",
  
  // Array de imágenes embebido
  "imagenes": [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg"
  ],
  
  // Objeto de metadatos flexible
  "metadatos": {
    "marca": "HP",
    "modelo": "Pavilion 15",
    "peso": "1.75 kg",
    "garantia": "1 año",
    "otros": {
      "procesador": "Intel i5",
      "ram": "8GB",
      "ssd": "256GB"
    }
  },
  
  // Referencia a categoría
  "categoria": "675064d9e8f1234567890abc"
}
```

---

## 🔥 Ventajas Clave de esta Implementación

### 1. **Performance**
- ✅ 1 query en lugar de 3 (producto + imágenes + metadatos)
- ✅ Menos latencia en la red
- ✅ Populate de Mongoose solo donde es necesario (categoría)

### 2. **Flexibilidad**
- ✅ Agregar campos a `metadatos.otros` sin ALTER TABLE
- ✅ Arrays dinámicos de imágenes
- ✅ Schema flexible con `Schema.Types.Mixed`

### 3. **Simplicidad**
- ✅ Código más legible (un controlador vs tres)
- ✅ Menos tablas que mantener
- ✅ Sin lógica compleja de JOINs

### 4. **Escalabilidad**
- ✅ MongoDB escala horizontalmente fácil
- ✅ Sharding por categorías posible
- ✅ Replicación nativa

---

## 🔧 Tecnologías

- **Node.js** v18
- **Express** v4.18
- **MongoDB** v7.0 (NoSQL)
- **Mongoose** v8.0 (ODM)
- **Docker** & **Docker Compose**

---

## 📚 Comparación: Query SQL vs MongoDB

### SQL (Antes):
```sql
-- Query 1: Obtener producto
SELECT * FROM productos WHERE id = 1;

-- Query 2: Obtener imágenes
SELECT * FROM imagenes_producto WHERE producto_id = 1;

-- Query 3: Obtener metadatos
SELECT * FROM metadatos_producto WHERE producto_id = 1;

-- Query 4: JOIN con categoría
SELECT p.*, c.nombre as categoria_nombre
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
WHERE p.id = 1;
```

### MongoDB (Ahora):
```javascript
// Un solo query con populate
await Product.findById(id).populate('categoria', 'nombre');

// Retorna TODO en un documento:
// - producto
// - imágenes[]
// - metadatos{}
// - categoria (referencia)
```

---

## 📝 Notas de Desarrollo

- Mantiene el **estilo simple del profesor** (no Clean Architecture)
- **Borrado lógico** implementado (campo `activo`)
- Passwords sin hashear (agregar bcrypt en producción)
- `timestamps: true` automático (createdAt, updatedAt)

---

## 🎓 Aprendizajes Clave

1. **Cuándo embeber:** Datos que siempre se consultan juntos (imágenes, metadatos)
2. **Cuándo referenciar:** Datos que se reutilizan (categorías, usuarios)
3. **Flexibilidad NoSQL:** `Schema.Types.Mixed` para campos dinámicos
4. **Populate de Mongoose:** Similar a JOINs pero más eficiente

---

**Adminia NoSQL** - Simplicidad y Performance para PYMES 🚀
