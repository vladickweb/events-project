const router = require('express').Router()
const Event = require('./../models/Event.model')
const Message = require('./../models/Message.model')

router.get('/eventos', (req, res) => {
	Event
		.find()
		.then((event) => res.json(event))
		.catch((err) => console.log(err))
})


router.get('/eventos/:id', (req, res) => {

	const {id} = req.params
	
	Event
		.findById(id)
		.then((event) => res.json(event))
		.catch((err) => console.log(err))
})


router.get('/messages/:id', (req, res) => {

	const {id} = req.params

	Message
		.find({groupOwner: id})
		.populate('name')
		.then((messages) => res.json(messages))
		.catch((err) => console.log(err))
})


router.post('/messages/create', (req, res) => {

	const {body, name, id} = req.body
	
	Message
		.create({name, body, groupOwner:id})
		.then((messages) => res.json(messages))
		.catch((err) => console.log(err))
})

module.exports = router