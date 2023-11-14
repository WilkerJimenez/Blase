const swaggerJs = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const apiSpecs = {
    definition: {
        openapi: '3.0.0',
        info: { title: 'BlaseREST', version: '1.0.0' }
    },
    apis: ['../../routes/routes.js'],
};

const swaggerSpec = swaggerJs(apiSpecs);

const docs = (app, port) => {
    app.use('/blase/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/blase/docs.json', (req, res) => {
        res.setHeader('Content/Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Swagger: http://localhost:${port}/blase/docs`)
};
module.exports = {
    docs
};