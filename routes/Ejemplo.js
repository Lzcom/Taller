// routes/ejemplo.js
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/ejemplo:
 *   get:
 *     summary: Devuelve un ejemplo
 *     responses:
 *       200:
 *         description: Un ejemplo exitoso
 */
router.get('/', (req, res) => {
    res.status(200).send('Ejemplo de respuesta');
});

module.exports = router;
