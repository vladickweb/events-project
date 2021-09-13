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
    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            res.render('admin/user-info', user)
        })
        .catch(err => console.log(err))
})

router.get('/usuarios/:id/edit', (req, res) => {
    //TODO: VISTA DE EDITRAR EL USUARIO 
    const { id } = req.params
    
    User
        .findById(id)
        .then(user => res.render('user/edit-user', user))
        .catch(err => console.log(err))
})

router.post('/usuarios/:id/edit', (req, res) => {
    // TODO: VISTA PARA ENVIAR EL FORMULARIO
})

router.post('/usuarios/:id/remove', (req, res) => {
    // TODO: BOTON DE ELIMINAR USUARIO
})



module.exports = router;

