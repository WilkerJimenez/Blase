const firebaseConfig = require('../dependencies/firebaseConfig')
const serviceAccount = require("../dependencies/serviceAccountKey.json");
const admin = require("firebase-admin");
const firebaseApp = require('firebase/app')
const auth = require('firebase/auth');
const firestore = require('firebase/firestore');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = firebaseApp.initializeApp(firebaseConfig);

module.exports = {
    app,
    auth,
    admin,
    firestore
}