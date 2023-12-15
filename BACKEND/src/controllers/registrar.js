const { auth } = require('../dependencies/dependencies')
const { admin } = require("../dependencies/dependencies");

const db = admin.firestore();

const registrar = async (req, res) => {
    const user = {
        displayName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        profilePic: req.body.profilePic
    }

    console.log(user)
    await auth.createUserWithEmailAndPassword(auth.getAuth(), user.email, user.password)
        .then(async (userCredentials) => {
            await auth.updateProfile(auth.getAuth().currentUser, {
                displayName: user.displayName,
                photoURL: user.profilePic
            }).catch(error => {
                console.log(error)
            })
            res.send(userCredentials)
        }).catch(error => {
            if (error.code === "auth/email-already-in-use") {
                res.sendStatus(409);
            } else {
                res.sendStatus(error);
            }
        });
}

const registrarToDb = async (req, res) => {
    const user = {
        displayName: req.body.userName,
        email: req.body.email,
        uid: req.body.uid,
        profilePic: req.body.profilePic,
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