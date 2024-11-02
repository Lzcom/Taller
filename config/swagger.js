// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0', // especificar la versión de OpenAPI
        info: {
            title: 'Taller API',
            version: '1.0.0',
            description: 'Documentación de la API para el Taller',
            contact: {
                name: 'Lizbeidy Coneo',
                email: 'lizbeidy.coneoc@pca.edu.co',
            },
        },
        servers: [
            {
                url: 'http://localhost:8000', // Cambia esto si tu servidor corre en otro puerto
            },
        ],
    },
    apis: ['./routes/*.js'], // Cambia esto según la ubicación de tus rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = { swaggerUi, swaggerDocs };
