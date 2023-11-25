const firebaseConfig = require('../dependencies/firebaseConfig')
var admin = require("firebase-admin");
var serviceAccount = require("../dependencies/serviceAccountKey.json");
const firebaseApp = require('firebase/app')
const auth = require('firebase/auth');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
firebaseApp.initializeApp(firebaseConfig);

module.exports = {
    firebaseApp,
    auth,
    admin
}