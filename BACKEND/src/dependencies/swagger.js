const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../../routes/swaggerEndpoints.json');

const apiSpecs = {
    swaggerOptions: {
        url: "/api/swaggerEndpoints.json",
    },
};

const docs = (app, port) => {
    app.use('/api/docs', swaggerUi.serveFiles(null, apiSpecs), swaggerUi.setup(null, apiSpecs));
    app.get("/api/swaggerEndpoints.json", (req, res) => res.json(swaggerDocument));
    console.log(`Swagger: http://localhost:${port}/api/docs`)
};
module.exports = {
    docs
};