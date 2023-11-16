const express = require('express');
const login = require('../src/controllers/login')
const registrar = require('../src/controllers/registrar')
let router = express.Router();
router
    .route("/login")
    .get(login.login)

router
    .route("/registrar")
    .post(registrar.registrar)

module.exports = router;