const { admin } = require('../dependencies/dependencies')

const registrar = async (req, res) => {
    const user = {
        email: req.body.email,
        password: req.body.password,
    }
    const userResponse = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        emailVerified: false,
        disabled: false,
    });
    res.json(userResponse);
}

module.exports = {
    registrar
}