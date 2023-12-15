const { auth } = require('../dependencies/dependencies')

const login = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }

    auth.signInWithEmailAndPassword(auth.getAuth(), user.email, user.password)
        .then(userCredentials => {
            res.send(userCredentials)
        }).catch(error => {
            if (error.code === "auth/invalid-login-credentials") {
                res.sendStatus(400)
            }else{
                res.sendStatus(502)
            }
        });
}

const logOut = async (req, res) => {
    auth.signOut(auth.getAuth()).then(() => {
        res.sendStatus(200)
    }).catch(error => {
        res.send(error)
    });
}

module.exports = {
    login,
    logOut
}