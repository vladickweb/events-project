const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const session = require('express-session');

router.get('/', (req, res) => {
    res.send('mostrar eventos')
})

router.get('users', (req, res) => {
    // TODO: RENDERIZADO DE TODOS LOS USUARIOS
})

router.get('/users/:id', (req, res) => {
    // TODO: VISTA EN DETALLE DEL USUARIO CON POSIBILIDAD DE BORRAR Y EDITAR
})

router.get('/users/:id/edit', (req, res) => {
    //TODO: VISTA DE EDITRAR EL USUARIO 
})

router.post('/users/:id/edit', (req, res) => {
    // TODO: VISTA PARA ENVIAR EL FORMULARIO
})

router.post('/users/:id/remove', (req, res) => {
    // TODO: BOTON DE ELIMINAR USUARIO
})



module.exports = router;

