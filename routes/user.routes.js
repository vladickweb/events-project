const router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
const session = require('express-session')
const User = require('../models/User.model')
const Group = require('../models/Group.model')

router.get('/', (req, res) => {
	const id = req.session.currentUser._id
	User.findById(id)
		.then((user) => res.render('user/profile', user))
		.catch((err) => console.log(err))
})

router.get('/editar-perfil/:id', (req, res) => {
	// TODO: FORMULARIO DE EDICIÓN DE PERFIL CON SUS DATOS

	const {id} = req.params
	User.findById(id)
		.then((user) => res.render('user/edit-user', user))
		.catch((err) => console.log(err))
})

router.post('/editar-perfil/:id', (req, res) => {
	// TODO: FORMULARIO DE ENVIO DE PERFIL CON LOS DATOS
	const {id} = req.params
	const {name} = req.body

	User.findByIdAndUpdate(id, {name}, {new: true})
		.then(res.redirect('/'))
		.catch((err) => console.log(err))
})

router.get('/buscar-usuarios', (req, res) => {
	// TODO: LISTADO DE USUARIOS Y BÚSQUEDA DE AMIGOS
	User.find({rol: 'client'})
		.then((clients) => res.render('admin/list-clients', {clients}))
		.catch((err) => console.log(err))
})

router.post('/buscar-usuarios/:id/agregar', (req, res) => {
	const user = req.session.currentUser
	const {id} = req.body

	User.findByIdAndUpdate(user._id, {$push: {friends: id}}, {new: true})
		.then((user) => {
			req.session.currentUser = user
			res.redirect('/user/buscar-usuarios')
		})
		.catch((err) => console.log(err))
	// TODO: AÑADIR USUARIOS A AMIGOS
})

router.get('/grupos', (req, res) => {
	// TODO: listado de grupos ---------- ERRROR SI ESTÁ VACÍO
	const id = req.session.currentUser._id

	Group.find({owner: id})
		.then((groups) => res.render('group/list-groups', {groups}))
		.catch((err) => console.log(err))
})
router.get('/amigos', (req, res) => {
	const id = req.session.currentUser._id
	// res.send(id)

	User.findById(id)
		.populate('friends')
		.then((user) => res.render('user/friends', user))
		.catch((err) => console.log(err))
})

router.get('/grupos/crear', (req, res) => {
	const id = req.session.currentUser._id

	User.findById(id)
		.populate('friends')
		.then((user) => res.render('group/create', user))
		.catch((err) => console.log(err))
})

router.post('/grupos/crear', (req, res) => {
	const {title, users} = req.body
	const owner = req.session.currentUser._id

	Group.create({title, users, owner})
		.then(res.redirect('/user/grupos'))
		.catch((err) => console.log(err))
})

router.get('/grupos/:id', (req, res) => {
	const {id} = req.params

	Group.findById(id)
		.then((group) => res.render('group/chat'))
		.catch((err) => console.log(err))
})
module.exports = router
