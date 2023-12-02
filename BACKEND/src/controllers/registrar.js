const { auth } = require('../dependencies/dependencies')
const { admin } = require("../dependencies/dependencies");

const db = admin.firestore();

const registrar = async (req, res) => {
    const user = {
        displayName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
    }

    await auth.createUserWithEmailAndPassword(auth.getAuth(), user.email, user.password)
        .then(userCredentials => {
            res.send(userCredentials);
        }).catch(error => {
            if (error.code === "auth/email-already-in-use") {
                res.sendStatus(409);
            } else {
                res.sendStatus(502);
            }
        });
}

const registrarToDb = async (req, res) => {
    const user = {
        displayName: req.body.userName,
        email: req.body.email,
        uid: req.body.uid,
    }

    await db.collection('usuarios').doc(user.uid).set(user)
        .then(() => {
            res.sendStatus(200)
        }).catch(error => {
            res.send(error)
        });
}

module.exports = {
    registrar,
    registrarToDb
}