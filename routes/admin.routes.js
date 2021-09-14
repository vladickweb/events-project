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
        .then(companies => res.render('admin/list-companies', { companies }))
        .catch(err => console.log(err))
})

router.get('/usuarios/clientes', (req, res) => {
    User
        .find({rol: 'client'})
        .then(clients => res.render('admin/list-clients', { clients }))
        .catch(err => console.log(err))
})

router.get('/usuarios/:id', (req, res) => {
    const { id } = req.params

    User
        .findById(id)
        .then(user => {
            res.render('admin/user-info', user)
        })
        .catch(err => console.log(err))
})

router.get('/usuarios/:id/editar', (req, res) => {
    const { id } = req.params
    
    User
        .findById(id)
        .then(user => res.render('user/edit-user', user))
        .catch(err => console.log(err))
})

router.post('/usuarios/:id/editar', (req, res) => {

    const { id } = req.params
    const { name, email } = req.body
    User
        .findByIdAndUpdate(id, {name, email}, {new: true})
        .then(() => res.redirect(`/admin/usuarios/${id}`))
        .catch(err => console.log(err))
})

router.post('/usuarios/:id/borrar', (req, res) => {
    const { id, route } = req.body

    User
        .findByIdAndDelete(id)
        .then(res.redirect(`/admin/usuarios/${route}`))
        .catch(err => console.log(err))
})



module.exports = router;

