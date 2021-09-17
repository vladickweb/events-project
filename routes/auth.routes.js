const express = require('express')
const passport = require('passport')
const router = express.Router()
const User = require('../models/User.model')

router.get(
	'/google',
	passport.authenticate('google', {scope: ['profile', 'email']})
)

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
	const user = req.user
	req.session.currentUser = user
	req.app.locals.isLoggedIn = true
	id = user._id

	res.redirect('/auth/redirect')
})

router.get('/redirect', (req, res) => {
	const user = req.session.currentUser

	User.findById(user._id).then((user) => {
		switch (user.rol) {
			case 'company':
				res.redirect('/empresa/crear')
				break
			case 'client':
				res.redirect('/')
				break
			case 'unknown':
				res.redirect('/sign-up/rol')
				break
			case 'admin':
				res.redirect('/admin/eventos')
				break
		}
	})
	.catch(err => console.log(err))
})

module.exports = router
