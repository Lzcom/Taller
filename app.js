const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const { addHeroe, delHeroe, updHeroe, findHeroeByCriteria, orderHeroeByCriteria } = require("./index"); 

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
app.listen(port, () => {
    console.log("Servidor corriendo en puerto", port);
});
