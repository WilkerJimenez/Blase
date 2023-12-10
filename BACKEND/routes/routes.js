const express = require('express');
const login = require('../src/controllers/login')
const registrar = require('../src/controllers/registrar')
const verifySession = require('../src/controllers/auth.js')
const home = require('../src/controllers/home.js')

let router = express.Router();

function routerF(sockets) {

    router
        .route("/login")
        .post(login.login)

    router
        .route("/logout")
        .get(login.logOut)

    router
        .route("/verifyId")
        .post(verifySession.verifySession);

    router
        .route("/registrar")
        .post(registrar.registrar)

    router
        .route("/registrarToDb")
        .post(registrar.registrarToDb)

    router
        .route("/search")
        .post(home.search)

    router
        .route("/addFriend")
        .post(home.addFriend)

    //WS
    sockets.on('connection', (socket) => {
        socket.on('getFriends', async (data) => {
            const result = await home.getFriendsDB(data.userId);
            socket.emit('getFriends', result)
        })
        socket.on('searchFriends', async (data) => {
            let friends = data.friends;
            const result = [] = await home.search(data.userId, data.friendName);
            if (result) {
                let friendsIds = [];
                friends?.forEach((element) => {
                    friendsIds.push(element.uid)
                });
                let filter = [] = result?.filter((item) => !friendsIds.includes(item.uid))
                socket.emit('searchFriends', filter)
            } else {
                socket.emit('searchFriends', result)
            }

        })
    })

    return router;
}
module.exports = routerF;