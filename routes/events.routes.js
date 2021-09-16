const router = require('express').Router()
const Event = require('../models/Event.model')
const transporter = require('../config/mailing.config')
const User = require('../models/User.model')
const { checkId, isLoggedIn, checkRoles } = require("../middleware")

router.get('/', checkRoles('company', 'client'), (req, res) => {
	Event.find({isAccepted: true}).then((events) =>
		res.render('events/list-events', {events})
	)
})

router.get('/:id', isLoggedIn, checkId, checkRoles('company', 'client'), (req, res) => {
	const {id} = req.params
	const googleApi = process.env.MAPS_API

	Event.findById(id)
		// .then(event => res.send(event))
		.then((event) => res.render('events/details-event', {event, googleApi}))
		.catch((err) => console.log(err))
})

router.post('/:id/reserve', isLoggedIn, checkId, checkRoles('client'), (req, res) => {
	const {id} = req.params

	Event.findById(id)
		.then(() => {
			res.session.currentUser._id.push(id)
		})
		.catch((err) => console.log(err))
})

router.get('/:id/contacto', isLoggedIn, checkId, checkRoles('client'), (req, res) => {
	// TODO: FORMULARIO DE CONTACTO CON EVENTO -------- COMPLETAR ENVIO DE CORREO
	const {id} = req.params

	Event.findById(id)
		.populate('owner')
		.then((event) => res.render('user/contact', event))

		.catch((err) => console.log(err))
})

router.post('/:id/contacto', isLoggedIn, checkId, checkRoles('client'), (req, res) => {
	//TODO: ENVIAR FORMUARIO DE CONTACTO
	const {from, message, to} = req.body

	// res.send(req.body)
	transporter
		.sendMail({
			from: `contacto web <<popinoreloaded@gmail.com>>`,
			to,
			subject: `Solicitud de contacto`,
			text: message,
			html: `<b>${message}</b><br/>CLIENTE: ${from}`,
		})
		.then((info) => res.send(info))
		.catch(err => console.log(err))
})

router.post('/reserva/:id', isLoggedIn, checkId, checkRoles('client'), (req, res) => {
	const {id} = req.params
	const userId = req.session.currentUser._id

	Event.findByIdAndUpdate(id, {$push: {reserve: userId}}, {new: true})
		.then(() => res.redirect('/eventos'))
		.catch((err) => console.log(err))
})

module.exports = router
