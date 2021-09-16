const router = require('express').Router()
const User = require('../models/User.model')
const Event = require('../models/Event.model')
const { checkId, isLoggedIn, checkRoles } = require("../middleware")

router.get('/', isLoggedIn, (req, res) => {
	res.send('mostrar eventos')
})


router.get('/usuarios', isLoggedIn, checkRoles('admin'), (req, res) => {
	res.render('admin/users')
})


router.get('/usuarios/empresas', isLoggedIn, checkRoles('admin'), (req, res) => {
	User
		.find({rol: 'company'})
		.then((companies) => res.render('admin/list-companies', {companies}))
		.catch((err) => console.log(err))
})


router.get('/usuarios/clientes', isLoggedIn, checkRoles('admin'), (req, res) => {
	User
		.find({rol: 'client'})
		.then((clients) => res.render('admin/list-clients-admin', {clients}))
		.catch((err) => console.log(err))
})


router.get('/usuarios/:id', isLoggedIn, checkId, checkRoles('admin'), (req, res) => {

	const {id} = req.params

	User
		.findById(id)
		.then((user) => {
			res.render('admin/user-info', user)
		})
		.catch((err) => console.log(err))
})


router.get('/usuarios/:id/editar', isLoggedIn, checkId, checkRoles('admin'), (req, res) => {

	const {id} = req.params

	User
		.findById(id)
		.then((user) => res.render('user/edit-user', user))
		.catch((err) => console.log(err))
})


router.post('/usuarios/:id/editar', isLoggedIn, checkId, checkRoles('admin'), (req, res) => {

	const {id} = req.params
	const {name, email} = req.body

	User
		.findByIdAndUpdate(id, {name, email}, {new: true})
		.then(() => res.redirect(`/admin/usuarios/${id}`))
		.catch((err) => console.log(err))
})


router.post('/usuarios/:id/borrar', isLoggedIn, checkId, checkRoles('admin'), (req, res) => {

	const {id, route} = req.body

	User
		.findByIdAndDelete(id)
		.then(res.redirect(`/admin/usuarios/${route}`))
		.catch((err) => console.log(err))
})


router.get('/usuarios/empresas/eventos', isLoggedIn, checkRoles('admin'), (req, res) => {	
	Event
		.find({isAccepted: false})
		.then((events) => res.render('admin/list-events-admin', {events}))
		.catch((err) => console.log(err))
})


router.post('/usuarios/empresas/:id/eventos/borrar', isLoggedIn, checkId, checkRoles('admin'), (req,res) => {

	 const {id} = req.params

	 Event
		.findByIdAndDelete(id)
		.then(() => res.redirect(`/admin/usuarios/empresas/eventos`))
		.catch((err) => console.log(err))
})


router.post('/usuarios/empresas/:id/eventos/aceptar', isLoggedIn, checkId, checkRoles('admin'), (req, res) => {

	const {id} = req.params

	Event
		.findByIdAndUpdate(id, {isAccepted: true})
		.then(() => res.redirect(`/admin/usuarios/empresas/eventos`))
		.catch((err) => console.log(err))
})

module.exports = router