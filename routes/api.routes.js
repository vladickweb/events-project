const router = require('express').Router()
const Event = require('./../models/Event.model')
const Message = require('./../models/Message.model')

router.get('/eventos', (req, res) => {
	Event.find()
		.then((event) => res.json(event))
		.catch((err) => console.log(err))
})

router.get('/messages', (req, res) => {
	Message.find()
		.populate('name')
		.then((messages) => res.json(messages))
		.catch((err) => console.log(err))
})

router.post('/messages/create', (req, res) => {
	const {body, name} = req.body

	Message.create({name, body})
		.then((messages) => res.json(messages))
		.catch((err) => console.log(err))
})

module.exports = router
