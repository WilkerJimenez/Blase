const express = require('express');
const { docs: docs } = require('./src/dependencies/swagger');
const routes = require('./routes/routes');
const app = express();
const port = ('8080');

app.use(express.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
  });
app.use("/api", routes);

app.listen(port, () => {
    console.log(`Puerto ${port} con vida`);
    docs(app, port);
});