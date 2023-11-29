const express = require('express');
const login = require('../src/controllers/login')
const registrar = require('../src/controllers/registrar')
const verifySession = require('../src/controllers/auth.js')
let router = express.Router();
router
    .route("/login")
    .post(login.login)

router
    .route("/loginG")
    .post(login.signinWithGoogle)

router
    .route("/logout")
    .get(login.logOut)

router
    .route("/verifyId")
    .post(verifySession.verifySession);

router
    .route("/registrar")
    .post(registrar.registrar)

module.exports = router;