const { admin } = require("../dependencies/dependencies");
const { v4 } = require('uuid')

const db = admin.firestore();

const enviarMensaje = async (req, res) => {
    var randomId = v4();
    var chatId = req.body.chatId;
    const msg = {
        emisor: req.body.emisor,
        fecha: req.body.fecha,
        mensaje: req.body.mensaje,
        orden: req.body.orden,
        visto: req.body.visto,
        mensajeResp: req.body.mensajeResp,
        fileName: req.body.fileName,
        url: req.body.url,
        mensajeId: randomId
    };

    await db.collection('chats').doc(chatId).collection('mensajes').doc(randomId).set(msg).then(() => {
        res.sendStatus(200)
    }).catch(error => {
        res.send(error)
    });
}

const obtenerMensaje = async (chatId) => {
    var data = [];
    await db.collection('chats').doc(chatId).collection('mensajes').orderBy("orden", "asc").limit(25).get().then(msgs => {
        msgs.forEach(doc => {
            data.push(doc.data())
        })
    }).catch(error => {
        console.log(error)
    });

    return data;
}

const lastmsgs = async (chatId) => {
    var data = null;
    await db.collection('chats').doc(chatId).collection('mensajes').orderBy("orden", "asc").limit(1).get().then(result => {
        if (result.docs[0]) {
            data = result.docs[0].data();
        }
    }).catch(error => {
        console.log(error);
    });

    return data;
}

const seen = (chatId) => {
    db.collection('chats').doc(chatId).collection('mensajes').orderBy("orden", "asc").limit(1).get().then(result => {
        result.docs[0].ref.update({
            visto: true
        });
    }).catch(error => {
        console.log(error);
    });
    return 200;
}

module.exports = {
    enviarMensaje,
    obtenerMensaje,
    seen,
    lastmsgs
}