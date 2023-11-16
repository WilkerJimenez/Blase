const admin = require('firebase-admin');
const credentials = require('./blaseKey.json')
admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

module.exports = {
    admin
}