const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const session = require('express-session');
const Event = require('../models/Event.model')



router.get('/', (req, res) => {
    Event
        .find()
        .then(events => res.render('events/list-events', { events }))
})

router.get('/:id', (req, res) => {
    const { id } = req.params 

    Event
        .findById(id)
        .then(event => res.render('events/details-event', event))
        .catch(err => console.log(err))
})

router.post('/:id/reserve', (req, res) => {
    
    const { id } = req.params

    Event
        .findById(id)
        .then(event => {
            res.session.currentUser._id.push(id)
        })
        .catch(err => console.log(err))
})

router.get('/:id/contact', (req, res) => {
    // TODO: FORMULARIO DE CONTACTO CON EVENTO
})

router.post('/:id/contact', (req, res) => {
    //TODO: ENVIAR FORMUARIO DE CONTACTO
})




module.exports = router;
