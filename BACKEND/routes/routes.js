const express = require('express');
const login = require('../src/controllers/login')
const registrar = require('../src/controllers/registrar')
let router = express.Router();
router
    .route("/login")
    .post(login.login)

router
    .route("/logout")
    .get(login.logOut)

router
    .route("/registrar")
    .post(registrar.registrar)

    router
    .route("/registrarG")
    .get(registrar.signinWithGoogle)

module.exports = router;