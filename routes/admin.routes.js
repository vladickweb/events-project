const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const session = require('express-session');
const User = require('../models/User.model')

router.get('/', (req, res) => {
    res.send('mostrar eventos')
})

router.get('/usuarios', (req, res) => {
    res.render('admin/users')
})

router.get('/usuarios/empresas', (req, res) => {
    User
        .find({rol: 'company'})
        .then(companies => res.send(companies))
        .catch(err => console.log(err))
})

router.get('/usuarios/clientes', (req, res) => {
    User
        .find({rol: 'client'})
        .then(clients => res.send(clients))
        .catch(err => console.log(err))
})

router.get('/usuarios/:id', (req, res) => {
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

