const express = require('express');
const {docs: docs} = require('./src/dependencies/swagger');
const app = express();
const port = ('8080');

app.use(express.json());

app.listen(port, ()=>{
    console.log(`Puerto ${port} con vida`);
    docs(app, port);
});