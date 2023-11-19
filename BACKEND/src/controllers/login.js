const { admin } = require('../dependencies/dependencies')
const { auth } = require('../dependencies/dependencies')

const login = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    auth.signInWithEmailAndPassword(auth.getAuth(), user.email, user.password)
        .then(userCredentials => {
            res.json(userCredentials)
        }).catch(error => {
            res.send(error)
        });
}

const logOut = async (req, res) => {
    auth.signOut(auth.getAuth()).then(() => {
        res.send("Signed out succesfully")
    }).catch(error => {
        res.send(error)
    });
}

module.exports = {
    login,
    logOut
}