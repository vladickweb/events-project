const router = require('express').Router()
const fileUploader = require('../config/cloudynary.config')
const Event = require('../models/Event.model')
const User = require('../models/User.model')
const { checkId, isLoggedIn, checkRoles } = require("../middleware")

router.get('/crear', isLoggedIn, checkRoles('company'), (req, res) => {
	res.render('events/create-event')
})


router.post('/crear', isLoggedIn, fileUploader.single('event-cover-image'), checkRoles('company'), (req, res) => {

	const {title, description, category, city, country, number, lat, lng, date} =
		req.body

	const dateFormated = date.substring(0, 10)

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

	Event
		.create({
			title,
			direction,
			description,
			category,
			location,
			date: dateFormated,
			image: req.file.path,
			owner,
	})
		.then(() => {
			res.redirect('/empresa/crear')
		})
		.catch((err) => console.log(err))
})


router.get('/perfil', isLoggedIn, checkRoles('company'), (req, res) => {

	const id = req.session.currentUser._id

	Event
		.find({owner: id})
		.populate('reserve')
		// .select("title direction description category location ")
		.then((events) => res.render('company/profile', {events}))
		.catch((err) => console.log(err))
})


router.get('/perfil/editar', isLoggedIn, checkRoles('company'), (req, res) => {

	const id = req.session.currentUser._id

	User
		.findById(id)
		.then((user) => res.render('company/edit-profile', user))
		.catch((err) => console.log(err))
})

router.post('/perfil/editar/:id', isLoggedIn, checkId, checkRoles('company'), (req, res) => {

	const id = req.session.currentUser._id
	const {name} = req.body

	User
		.findByIdAndUpdate(id, {name}, {new: true})
		.then(() => res.redirect('/'))
		.catch((err) => console.log(err))
})

module.exports = router