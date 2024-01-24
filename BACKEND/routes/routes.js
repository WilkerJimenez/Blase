const express = require('express');
const login = require('../src/controllers/login')
const registrar = require('../src/controllers/registrar')
const verifySession = require('../src/controllers/auth.js')
const home = require('../src/controllers/home.js')
const profile = require('../src/controllers/profile.js')
const chat = require('../src/controllers/chat.js')

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
        .route("/sendRequest")
        .post(home.sendRequest)

    router
        .route("/addFriend")
        .post(home.addFriend)

    router
        .route("/profileUpdate")
        .post(profile.update)

    router
        .route("/enviarMsg")
        .post(chat.enviarMensaje)

    router
        .route("/seen")
        .post(chat.seen)
    //WS

    var connections = [];
    sockets.on('connection', (socket) => {

        socket.on('disconnect', (data) => {
            connections.forEach(connection => {
                var cont = 0;
                if (connection.socketId === socket.id) {
                    connections.splice(cont, 1)
                }
                cont++;
            })
        });

        socket.on('getFriends', async (data) => {
            if (data.userIdF !== '') {
                const result = await home.getFriendsDB(data.userId);
                const resultF = await home.getFriendsDB(data.userIdF);
                sockets.emit(`getFriends${data.userId}`, result)
                sockets.emit(`getFriends${data.userIdF}`, resultF)
            } else {
                if (connections.length === 0) {
                    const conValues = {
                        socketId: socket.id,
                        userId: data.userId
                    }
                    connections.push(conValues);
                } else {
                    connections.forEach(connection => {
                        if (connection.userId !== data.userId) {
                            const conValues = {
                                socketId: socket.id,
                                userId: data.userId
                            }
                            connections.push(conValues);
                        }
                    })
                }
                const result = await home.getFriendsDB(data.userId);
                sockets.emit(`getFriends${data.userId}`, result)
            }
        })

        socket.on('updateFriends', async (data) => {
            for (connection of connections) {
                if (connection.userId === data?.userIdF) {
                    const resultF = await home.getFriendsDB(data.userIdF);
                    sockets.emit(`getFriends${data.userIdF}`, resultF)
                }
            }
        })

        socket.on('getRequests', async (data) => {
            const result = await home.getRequestsDB(data.userId);
            sockets.emit(`getRequests${data.userId}`, result)
        })

        socket.on('searchFriends', async (data) => {
            let friends = data.friends;
            const result = [] = await home.search(data.userId, data.friendName);
            if (result) {
                let friendsIds = [];
                friends.forEach((element) => {
                    friendsIds.push(element?.uid)
                });
                let filter = [] = result?.filter((item) => !friendsIds?.includes(item?.uid))
                socket.emit('searchFriends', filter)
            } else {
                socket.emit('searchFriends', result)
            }

        })

        socket.on('getMsgs', async (data) => {
            const result = [] = await chat.obtenerMensaje(data.chatId);
            sockets.emit(`getMsgs${data.chatId}`, result)
        });

    })

    return router;
}

module.exports = routerF;