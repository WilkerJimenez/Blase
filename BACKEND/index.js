const express = require('express');
const { docs: docs } = require('./src/dependencies/swagger');
const routerF = require('./routes/routes');
const app = express();
const port = ('8080');
const server = require('http').createServer(app);
const sockets = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});


app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use("/api", routerF(sockets));
server.listen(port, () => {
    console.log(`Puerto ${port} con vida`);
    docs(app, port);
});

//WSS
