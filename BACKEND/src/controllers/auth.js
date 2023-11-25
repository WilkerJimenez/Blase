const { auth } = require('../dependencies/dependencies')
const { admin } = require('../dependencies/dependencies')

const verifySession = async (req, res) => {
    const idToken = req.idToken;
    admin.auth().verifyIdToken(idToken).then(() => {
        res.sendStatus(200);
    }).catch(error => {
        res.send(error)
    });
}

module.exports = {
    verifySession
}