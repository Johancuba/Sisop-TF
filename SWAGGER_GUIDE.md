# 📚 Guía de Swagger - Adminia API

## 🎯 Acceder a la Documentación Swagger

### Opción 1: URL Directa
Abre tu navegador y accede a:
```
http://localhost:3000/swagger
```

### Opción 2: Desde /api
```
http://localhost:3000/api
```
*Esta ruta te redirige automáticamente a Swagger*

### Opción 3: Desde la página principal
```
http://localhost:3000/
```
*Haz clic en el botón "📚 Ver Documentación API (Swagger)"*

---

## ✨ Características de Swagger UI

### 🔍 Explorar Endpoints
- **Categorías:** Gestión de categorías de productos
- **Productos:** CRUD con estructura NoSQL (imágenes y metadatos embebidos)
- **Usuarios:** Administración de usuarios con roles
- **Auditorías:** Sistema de logs y auditoría

### 🧪 Probar APIs Directamente
1. Haz clic en cualquier endpoint (ej: `POST /categorias/crear`)
2. Click en **"Try it out"**
3. Edita el JSON de ejemplo
4. Click en **"Execute"**
5. Ve la respuesta en tiempo real

### 📝 Ejemplos Incluidos
Cada endpoint tiene:
- ✅ Descripción clara
- ✅ Parámetros requeridos/opcionales
- ✅ Ejemplos de request body
- ✅ Códigos de respuesta esperados
- ✅ Schemas completos de MongoDB

---

## 🚀 Ejemplo Rápido

### 1. Crear una Categoría
```http
POST /api/categorias/crear
Content-Type: application/json

{
  "nombre": "Electrónica",
  "descripcion": "Dispositivos electrónicos"
}
```

### 2. Crear un Producto (NoSQL con embebidos)
```http
POST /api/productos/crear
Content-Type: application/json

{
  "titulo": "Laptop HP",
  "descripcion": "Laptop para trabajo",
  "precio": 899.99,
  "stock": 15,
  "sku": "LAP-001",
  "imagenes": [
    "https://example.com/img1.jpg",
    "https://example.com/img2.jpg"
  ],
  "metadatos": {
    "marca": "HP",
    "modelo": "Pavilion 15",
    "peso": "1.75 kg",
    "garantia": "1 año",
    "otros": {
      "procesador": "Intel i5",
      "ram": "8GB"
    }
  },
  "categoria": "ID_DE_CATEGORIA_CREADA"
}
```

---

## 📊 Ventajas de Swagger en Adminia

| Característica | Beneficio |
|----------------|-----------|
| **Documentación Automática** | Se actualiza con cada cambio de código |
| **Pruebas en Vivo** | Sin necesidad de Postman o curl |
| **Schemas Visuales** | Estructura NoSQL documentada |
| **Ejemplos Reales** | Casos de uso de productos embebidos |
| **Interactivo** | Ejecuta requests directamente |

---

## 🎨 Estructura NoSQL Documentada

Swagger muestra claramente la **fusión NoSQL** de Adminia:

### Antes (SQL - 3 tablas):
```
- Tabla productos
- Tabla imagenes_producto
- Tabla metadatos_producto
```

### Ahora (MongoDB - 1 documento):
```json
{
  "_id": "...",
  "titulo": "Laptop HP",
  "precio": 899.99,
  "imagenes": ["url1.jpg", "url2.jpg"],
  "metadatos": {
    "marca": "HP",
    "otros": { ... }
  },
  "categoria": ObjectId("...")
}
```

Todo esto está **perfectamente documentado** en Swagger con ejemplos interactivos.

---

## 🔧 Solución de Problemas

### Error: "Cannot GET /swagger"
```bash
# Reconstruir Docker con dependencias de Swagger
docker-compose down
docker-compose up --build -d

# Esperar 5 segundos y verificar
docker logs adminia_api
```

### Swagger no carga los endpoints
- Verifica que `swagger.js` esté en `src/`
- Confirma que las rutas tengan comentarios JSDoc
- Revisa logs: `docker logs adminia_api`

### Base de datos vacía
```bash
# Los datos persisten en volumen Docker
# Para resetear:
docker-compose down -v
docker-compose up --build -d
```

---

## 📖 Más Información

- **Swagger OpenAPI 3.0:** Estándar de la industria
- **JSDoc comments:** Documentan endpoints automáticamente
- **swagger-ui-express:** Interfaz visual interactiva
- **swagger-jsdoc:** Genera spec desde código

---

**¡Explora Swagger ahora!** → http://localhost:3000/swagger 🚀
