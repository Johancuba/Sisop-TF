const express = require("express")
const app = express()
const { swaggerUi, swaggerSpec } = require('./swagger')

//Conexion a BD
require("./database")

// Motor de Plantillas: EJS
app.set("view engine", "ejs")
app.set("views", __dirname + "/views");

//Usp de formato json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(express.static("./src/public"))

// Rutas de Adminia (NoSQL)
const productRouter = require("./routes/ProductRoute.js")
app.use("/api", productRouter)

const categoryRouter = require("./routes/CategoryRoute.js")
app.use("/api", categoryRouter)

const userRouter = require("./routes/UserRoute.js")
app.use("/api", userRouter)

const auditRouter = require("./routes/AuditRoute.js")
app.use("/api", auditRouter)

// Rutas Frontend (Vistas EJS)
const frontendRouter = require("./routes/FrontendRoute.js")
app.use(frontendRouter)

// Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customSiteTitle: "Adminia API Docs",
    customfavIcon: "https://swagger.io/swagger/media/assets/images/favicon-32x32.png"
}));

// Ruta /api redirige a Swagger
app.get("/api", (req, res)=>{
    res.redirect("/swagger")
});

// Ruta Dashboard EJS (interfaz visual para probar BD)
app.get("/dashboard", (req, res)=>{
    res.render("dashboard")
});

// Prueba de Respuesta en Pagina Inicial
app.get("/", (req, res)=>{
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Adminia - CMS para PYMES</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    color: white;
                }
                .container {
                    background: rgba(255,255,255,0.1);
                    padding: 40px;
                    border-radius: 10px;
                    backdrop-filter: blur(10px);
                }
                h1 { margin-top: 0; }
                a {
                    display: inline-block;
                    margin: 10px 10px 10px 0;
                    padding: 12px 24px;
                    background: white;
                    color: #667eea;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                }
                a:hover { background: #f0f0f0; }
                .features {
                    margin-top: 30px;
                    line-height: 1.8;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>🚀 Bienvenido a Adminia</h1>
                <p><strong>CMS NoSQL para PYMES</strong> - Gestión de contenidos digitales con MongoDB</p>
                
                <div>
                    <a href="/dashboard">🎨 Dashboard</a>
                    <a href="/admin/categorias">🏷️ Categorías</a>
                    <a href="/admin/productos">📦 Productos</a>
                    <a href="/admin/usuarios">👥 Usuarios</a>
                </div>
                <div>
                    <a href="/swagger">📚 API Docs</a>
                </div>
                
                <div class="features">
                    <h3>✨ Características:</h3>
                    <ul>
                        <li>✅ Productos con imágenes y metadatos embebidos</li>
                        <li>✅ Categorías con referencias</li>
                        <li>✅ Gestión de usuarios con roles</li>
                        <li>✅ Sistema de auditoría</li>
                        <li>✅ Arquitectura NoSQL optimizada</li>
                        <li>✅ Documentación Swagger completa</li>
                    </ul>
                </div>
            </div>
        </body>
        </html>
    `)
})

app.listen(3000, ()=>{
    console.log("¡Server UP! en http://localhost:3000/")
})