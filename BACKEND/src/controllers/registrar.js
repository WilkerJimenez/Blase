const { auth } = require('../dependencies/dependencies')

const registrar = async (req, res) => {
    const user = {
        displayName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
        passConfirmation: req.body.passConfirmation,
    }

    if (user.passConfirmation != user.password) {
        res.send("Las contraseñas son diferentes")
    } else {
        await auth.createUserWithEmailAndPassword(auth.getAuth(), user.email, user.password)
            .then(userCredentials => {
                res.json(userCredentials)
            }).catch(error => {
                res.send(error)
            });
    }
}

const signinWithGoogle = async (req, res) => {
    const provider = new auth.GoogleAuthProvider();
    auth.signInWithPopup(auth.getAuth(), provider).then(userCredentials => {
        res.send(userCredentials)
    }).catch(error => {
        res.send(error)
    });
}

module.exports = {
    registrar,
    signinWithGoogle
}