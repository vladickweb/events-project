const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const session = require('express-session');
const User = require('../models/User.model')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', (req, res) => {
    res.send(req.body)
})



router.get('/sign-up', (req, res) => {
    res.render('auth/sign-up')
})

router.post('/sign-up', (req, res) => {

    let { firstname, lastname, email, password } = req.body
    
    // !rol ? rol = 'client' : null
    !password ? res.render('auth/sign-up', { errorMsg: 'La contraseña no puede estar vacía' }) : null
    !email ? res.render('auth/sign-up', { errorMsg: 'El email no puede estar vacío' }) : null

    const name = `${firstname} ${lastname}`

    User
        .findOne({ email })
        .then(user => {
            if (user) {
                res.render('auth/sign-up', { errorMsg: 'Correo ya registrado' })
                return
            }

            const bcryptSalt = 10
            const salt = bcrypt.genSaltSync(bcryptSalt)
            const hashPass = bcrypt.hashSync(password, salt)

            User
                .create({ name, email, password: hashPass })
                .then(user => {
                    res.redirect('/sign-up/rol')
                    // user.rol === 'company' ? res.redirect('/empresa/crear') : res.redirect('/eventos')
                })
        })
        .catch(err => console.log(err))
})

router.get('/sign-up/rol', (req, res) => {
    
    res.render('auth/select-rol')
})

router.post('/sign-up/rol', (req, res) => {

    const { rol } = req.body

    res.send(req.session.currentUser)
    
    // let user = req.session.currentUser
    // user.rol = rol
    // req.session.currentUser = user

    // res.send(user)
    
})






module.exports = router;