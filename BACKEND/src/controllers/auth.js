const { auth } = require('../dependencies/dependencies')
const { admin } = require('../dependencies/dependencies')

const verifySession = async (req, res) => {
    const IdToken = req.body.IdToken;
    let checkRevoked = true;

    admin.auth().verifyIdToken(IdToken, checkRevoked).then(result => {
        res.sendStatus(200)
    }).catch(error => {
        if (error.code === 'auth/id-token-expired') {
            res.sendStatus(401)
        } else {
            res.sendStatus(502)
        }
    });
}

module.exports = {
    verifySession
}