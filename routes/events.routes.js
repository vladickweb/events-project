const router = require('express').Router()
const Event = require('../models/Event.model')
const transporter = require('../config/mailing.config')

router.get('/', (req, res) => {
	Event.find().then((events) => res.render('events/list-events', {events}))
})

router.get('/:id', (req, res) => {
	const {id} = req.params
	const googleApi = process.env.MAPS_API

	Event.findById(id)
		.then((event) => res.render('events/details-event', {event, googleApi}))
		.catch((err) => console.log(err))
})

router.post('/:id/reserve', (req, res) => {
	const {id} = req.params

	Event.findById(id)
		.then((event) => {
			res.session.currentUser._id.push(id)
		})
		.catch((err) => console.log(err))
})

router.get('/:id/contacto', (req, res) => {
	// TODO: FORMULARIO DE CONTACTO CON EVENTO -------- COMPLETAR ENVIO DE CORREO
	const {id} = req.params

	Event.findById(id)
		.populate('owner')
		.then((event) => res.render('user/contact', event))

		.catch((err) => console.log(err))
})

router.post('/:id/contacto', (req, res) => {
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


// TODO: REVISAR RUTA
router.get('/reserva/:id', (req, res) => {
	User.find()

		.then((event) => res.render('events/reserve', event))

		.catch((err) => console.log(err))
})

router.post('/reserva/:id', (req, res) => {
	const id = req.params

	User.findByIdAndUpdate({$push: {user: id}}, {new: true})
		.then((user) => {
			req.session.currentUser = user
			res.redirect('/events/list-events')
		})
		.catch((err) => console.log(err))
})

module.exports = router
