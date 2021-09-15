const router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
const session = require('express-session')
const fileUploader = require('../config/cloudynary.config')
const Event = require('../models/Event.model')
const User = require('../models/User.model')

router.get('/crear', (req, res) => {
	// TODO: VISTA FORMULARIO PARA CREAR EVENTO
	res.render('events/create-event')
})

router.post('/crear', fileUploader.single('event-cover-image'), (req, res) => {
	// TODO: FORMULARIO DE CREACIÓN DE EVENTO

	const {title, description, category, city, country, number, lat, lng} =
		req.body

	const direction = {
		city: city,
		country: country,
		number: number,
	}

	const location = {
		type: 'Point',
		coordinates: [lat, lng],
	}
	const owner = req.session.currentUser._id

	Event.create({
		title,
		direction,
		description,
		category,
		location,
		image: req.file.path,
		owner,
	})
		.then((event) => {
			res.redirect('/empresa/crear')
			//   res.redirect("/");
		})
		.catch((err) => console.log(err))
})

router.get('/perfil', (req, res) => {
	// TODO: PERFIL DE LA EMPRESA CON SUS EVENTOS
	const id = req.session.currentUser._id
	Event.find({owner: id})
		// .select("title direction description category location ")
		.then((events) => res.render('company/profile', {events}))
		.catch((err) => console.log(err))
})

router.get('/perfil/editar/:id', (req, res) => {
	// TODO: FORMULARIO DE EDICIÓN DE PERFIL CON SUS DATOS

	const id = req.session.currentUser._id

	User.findById(id)
		.then((user) => res.render('company/edit-profile', user))
		.catch((err) => console.log(err))
})

router.post('/perfil/editar/:id', (req, res) => {
	// TODO: FORMULARIO DE ENVIO DE PERFIL CON LOS DATOS
	const id = req.session.currentUser._id
	const {name} = req.body
	User.findByIdAndUpdate(id, {name}, {new: true})
		.then(res.redirect('/'))
		.catch((err) => console.log(err))
})

router.post('/estadisticas', (req, res) => {
	// TODO: VISTA PARA VER ESTADÍSTICAS DE RESERVAS
	const {id} = req.params

	Event.findById(id).then(res.render('company/profile'))
})

module.exports = router
