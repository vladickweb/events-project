const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const session = require('express-session');

router.get('/', (req, res) => {
    res.send(req.session.currentUser)
})

router.get('/editar-perfil', (req, res) => {
    // TODO: FORMULARIO DE EDICIÓN DE PERFIL CON SUS DATOS
})

router.post('/editar-perfil', (req, res) => {
    // TODO: FORMULARIO DE ENVIO DE PERFIL CON LOS DATOS
})

router.get('/buscar-usuarios', (req, res) => {
    // TODO: LISTADO DE USUARIOS Y BÚSQUEDA DE AMIGOS
})

router.post('/buscar-usuarios', (req, res) => {
    // TODO: AÑADIR USUARIOS A AMIGOS
})

router.get('/grupos', (req, res) => {
    // TODO: BOTON DE CREAR GRUPO Y SELECCIONAR A PERSONAS PARA EL GRUPO
})

router.post('/grupos', (req, res) => {
    // TODO: AÑADIR A AMIGOS AL GRUPO
})

router.get('/chat', (req, res) => {
    // TODO: RENDERIZAR CHAT DE GRUPO
})


module.exports = router;

