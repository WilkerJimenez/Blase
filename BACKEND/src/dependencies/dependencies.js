const firebaseConfig = require('../dependencies/firebaseConfig')
const firebaseApp = require('firebase/app')
const auth = require('firebase/auth');

firebaseApp.initializeApp(firebaseConfig);

module.exports = {
    firebaseApp,
    auth
}