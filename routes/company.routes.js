const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const session = require('express-session');

router.get('/profile', (req, res) => {
    // TODO: PERFIL DE LA EMPRESA CON SUS EVENTOS
})

router.get('/:id', (req, res) => {
    // TODO: MOSTRAR EVENTO CON SUS DATOS
})

router.post('/:id', (req, res) => {
    // TODO: EDITAR EVENTO
})

router.get('/crear', (req, res) => {
    // TODO: VISTA FORMULARIO PARA CREAR EVENTO
})

router.post('/crear', (req, res) => {
    // TODO: FORMULARIO DE CREACIÓN DE EVENTO
})

router.post('/estadisticas', (req, res) => {
    // TODO: VISTA PARA VER ESTADÍSTICAS DE RESERVAS
})

module.exports = router;

