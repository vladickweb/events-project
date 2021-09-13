const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const session = require('express-session');



router.get('/', (req, res) => {
    // TODO: VISTA CON TODOS LOS EVENTOS
})

router.get('/:id', (req, res) => {
    // TODO: DATOS DEL EVENTO Y MAPA
})

router.post('/:id/reserve', (req, res) => {
    // TODO: APUNTARSE A UN EVENTO
})

router.get('/:id/contact', (req, res) => {
    // TODO: FORMULARIO DE CONTACTO CON EVENTO
})

router.post('/:id/contact', (req, res) => {
    //TODO: ENVIAR FORMUARIO DE CONTACTO
})




module.exports = router;
