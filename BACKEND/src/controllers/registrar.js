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
    let credentials;

    await auth.createUserWithEmailAndPassword(auth.getAuth(), user.email, user.password)
        .then(async (userCredentials) => {
            await auth.updateProfile(auth.getAuth().currentUser, {
                displayName: user.displayName,
                photoURL: user.profilePic
            }).catch(error => {
                console.log(error)
            })
            credentials = userCredentials.user;
            await auth.sendEmailVerification(userCredentials.user);
            res.sendStatus(200)
        }).then(async () => {
            await regisDb(credentials);
        }).catch(error => {
            if (error.code === "auth/email-already-in-use") {
                res.sendStatus(409);
            } else if (error.code === "auth/weak-password") {
                res.sendStatus(422);
            } else {
                res.sendStatus(502);
            }
        });
}

const regisDb = async (user) => {
    const userInfo = {
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        profilePic: user.photoURL,
    }
    await db.collection('usuarios').doc(userInfo.uid).set(userInfo)
        .catch(error => {
            console.log(error)
        });
}

const registrarToDb = async (req, res) => {
    const userInfo = {
        displayName: req.body.userName,
        email: req.body.email,
        uid: req.body.uid,
        profilePic: req.body.profilePic,
    }
    await db.collection('usuarios').doc(userInfo.uid).set(userInfo)
        .then(() => {
            res.sendStatus(200);
        })
        .catch(error => {
            console.log(error)
        });
}

module.exports = {
    registrar,
    registrarToDb
}