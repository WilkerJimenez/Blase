const express = require('express');
const {docs: docs} = require('./src/dependencies/swagger');
const routes = require('./routes/routes');
const app = express();
const port = ('8080');

app.use(express.json());
app.use("/api", routes);

app.listen(port, ()=>{
    console.log(`Puerto ${port} con vida`);
    docs(app, port);
});