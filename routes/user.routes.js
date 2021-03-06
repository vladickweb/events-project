const router = require('express').Router()
const User = require('../models/User.model')
const Group = require('../models/Group.model')
const {isLoggedIn, checkId, checkRoles} = require('../middleware')
const CDNupload = require('../config/cloudynary.config')

router.get('/', isLoggedIn, checkRoles('client', 'company','admin'), (req, res) => {

	const id = req.session.currentUser._id

	User
		.findById(id)
		.then((user) => res.render('user/profile', user))
		.catch((err) => console.log(err))
})


router.get('/editar-perfil/:id', isLoggedIn, checkId, (req, res) => {

	const {id} = req.params
	
	User
		.findById(id)
		.then((user) => res.render('user/edit-user', user))
		.catch((err) => console.log(err))
})


router.post('/editar-perfil/:id', CDNupload.single('image') ,isLoggedIn, checkId, checkRoles('client', 'admin'), (req, res) => {

	const {id} = req.params
	const {name, email} = req.body
	const image = req.file.path
	
	console.log(req.session.user)

	User
		.findByIdAndUpdate(id, {name, email, image}, {new: true})
		.then(()=>res.redirect('/user'))
		.catch((err) => console.log(err))
})


router.get('/buscar-usuarios', isLoggedIn, (req, res) => {

	const user = req.session.currentUser._id

	User
		.find({"rol": "client"})
		.populate('friends')
		.then((clients) => {res.render('admin/list-clients', {clients})})
		.catch((err) => console.log(err))
})


router.post('/buscar-usuarios/:id/agregar', isLoggedIn, checkId, checkRoles('client', 'admin'), (req, res) => {

	const user = req.session.currentUser
	const {id} = req.body
	console.log(user, id)
	User
		.findByIdAndUpdate(user._id, {$push: {friends: id}}, {new: true})
		.then((user) => {
			req.session.currentUser = user
			res.redirect('/user/amigos')
		})
		.catch((err) => console.log(err))
})


router.get('/grupos', isLoggedIn, checkRoles('client', 'admin'), (req, res) => {

	const id = req.session.currentUser._id

	Group
		.find({$or: [ {owner: id} , {users: { $in: id }}]})
		.then((groups) => res.render('group/list-groups', {groups}))
		.catch((err) => console.log(err))
})


router.get('/amigos', isLoggedIn, checkRoles('client', 'admin'), (req, res) => {

	const id = req.session.currentUser._id

	User
		.findById(id)
		.populate('friends')
		.then((user) => res.render('user/friends', user))
		.catch((err) => console.log(err))
})


router.get('/grupos/crear', isLoggedIn, checkRoles('client', 'admin'), (req, res) => {

	const id = req.session.currentUser._id

	User
		.findById(id)
		.populate('friends')
		.then((user) => res.render('group/create', user))
		.catch((err) => console.log(err))
})


router.post('/grupos/crear', isLoggedIn, checkRoles('client', 'admin'), (req, res) => {

	const {title, users} = req.body
	const owner = req.session.currentUser._id

	Group
		.create({title, users, owner})
		.then(res.redirect('/user/grupos'))
		.catch((err) => console.log(err))
})


router.get('/grupos/:id', isLoggedIn, checkId, checkRoles('client', 'admin'), (req, res) => {

	const {id} = req.params
	const user = req.session.currentUser

	Group
		.findById(id)
		.then(() => res.render('group/chat', { user, id }))
		.catch((err) => console.log(err))
})

module.exports = router