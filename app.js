const express = require("express");
const app = express();
const PORT = process.env.PORT || 0;
const { addHeroe, delHeroe, updHeroe, findHeroeByCriteria, orderHeroeByCriteria } = require("./index"); 
const { swaggerUi, swaggerDocs } = require('./config/swagger');
const ejemploRoutes = require('./routes/Ejemplo'); 


// Middleware para servir la documentación de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Resto de tu configuración y rutas...
// Usa las rutas definidas
app.use('/api/ejemplo', ejemploRoutes); // Aquí defines el prefijo para tus rutas

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

app.use(express.json()); // Middleware para procesar JSON

// Endpoint para verificar el estado del servidor
app.get('/serverStatus', (req, res) => {
    res.send("Server Up!!");
});

// Endpoint para agregar un héroe
app.post('/heroes', addHeroe);

// Endpoint para eliminar un héroe
app.delete('/heroes/:heroeId', delHeroe);

// Endpoint para actualizar un héroe
app.put('/heroes/:heroeId', updHeroe);

// Endpoint para encontrar héroes por criterio
app.post('/heroes/search', findHeroeByCriteria);

// Endpoint para ordenar héroes por criterio
app.post('/heroes/order', orderHeroeByCriteria);

// Iniciar servidor
app.listen(PORT, () => {
    console.log("Servidor corriendo en puerto", port);
});
