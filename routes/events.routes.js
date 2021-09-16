const router = require('express').Router()
const Event = require('../models/Event.model')
const transporter = require('../config/mailing.config')
const User = require('../models/User.model')
const { checkId, isLoggedIn, checkRoles } = require("../middleware")

router.get('/', (req, res) => {
	Event
		.find({isAccepted: true})
		.then((events) => res.render('events/list-events', {events}))
		.catch((err) => console.log(err))	
})


router.get('/:id', isLoggedIn, checkId, checkRoles('company', 'client'), (req, res) => {

	const {id} = req.params
	const googleApi = process.env.MAPS_API

	Event
		.findById(id)
		.then((event) => res.render('events/details-event', {event, googleApi}))
		.catch((err) => console.log(err))
})


router.get('/:id/contacto', isLoggedIn, checkId, checkRoles('client'), (req, res) => {

	const {id} = req.params

	Event
		.findById(id)
		.populate('owner')
		.then((event) => res.render('user/contact', event))
		.catch((err) => console.log(err))
})


router.post('/:id/contacto', isLoggedIn, checkId, checkRoles('client'), (req, res) => {

	const {from, message, to} = req.body

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

	Event
		.findByIdAndUpdate(id, {$push: {reserve: userId}}, {new: true})
		.then(() => res.redirect('/eventos'))
		.catch((err) => console.log(err))
})

module.exports = router