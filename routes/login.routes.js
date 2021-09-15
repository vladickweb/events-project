const router = require('express').Router()
const mongoose = require('mongoose')
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
const session = require('express-session')
const User = require('../models/User.model')
const bcrypt = require('bcrypt')

router.get('/login', (req, res) => {
	res.render('auth/login')
})

router.post('/login', (req, res) => {
	const {email, password} = req.body

	if (!password || !email) {
		res.render('auth/login', {
			errorMsg: 'Rellena los campos',
		})
		return
	}

	User.findOne({
		email,
	})
		.then((user) => {
			if (!user) {
				res.render('auth/login', {
					errorMsg: 'Usuario no reconocido',
				})
				return
			}

			if (bcrypt.compareSync(password, user.password) === false) {
				res.render('auth/login', {
					errorMsg: 'Contraseña incorrecta',
				})
				return
			}

			req.session.currentUser = user
			res.redirect('/eventos')
		})
		.catch((err) => console.log(err))
})

router.get('/sign-up', (req, res) => {
	res.render('auth/sign-up')
})

router.post('/sign-up', (req, res) => {
	let {firstname, lastname, email, password} = req.body

	if (!password) {
		res.render('auth/sign-up', {
			errorMsg: 'La contraseña no puede estar vacía',
		})
	}

	if (!email) {
		res.render('auth/sign-up', {
			errorMsg: 'El email no puede estar vacío',
		})
	}

	const name = `${firstname} ${lastname}`

	User.findOne({
		email,
	})
		.then((user) => {
			if (user) {
				res.render('auth/sign-up', {
					errorMsg: 'Correo ya registrado',
				})
				return
			}

			const bcryptSalt = 10
			const salt = bcrypt.genSaltSync(bcryptSalt)
			const hashPass = bcrypt.hashSync(password, salt)

			User.create({
				name,
				email,
				password: hashPass,
			}).then((user) => {
				req.session.currentUser = user
				// res.redirect('/eventos')
				res.redirect('/sign-up/rol')
			})
		})
		.catch((err) => console.log(err))
})

router.get('/sign-up/rol', (req, res) => {
	res.render('auth/select-rol')
})

router.post('/sign-up/rol', (req, res) => {
	const {rol} = req.body
	const id = req.session.currentUser._id

	User.findByIdAndUpdate(
		id,
		{
			rol,
		},
		{
			new: true,
		}
	)
		.then((user) => {
			req.session.currentUser = user
			return user
		})
		.then((user) => {
			if (user.rol === 'company') {
				res.redirect('/empresa/crear')
			} else {
				res.redirect('/eventos')
			}
		})
		.catch((err) => console.log(err))
})

router.get('/logout', (req, res) => {
	req.session.destroy(() => res.redirect('/'))
})

module.exports = router
