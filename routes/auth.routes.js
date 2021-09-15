const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const router = express.Router()
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy
const User = require('../models/User.model')

router.get(
	'/google',
	passport.authenticate('google', {
		scope: ['profile', 'email'],
	})
)

router.get(
	'/google/redirect',
	passport.authenticate('google'),
	(req, res, next) => {
		user = req.user
		req.session.currentUser = user
		id = user._id

		User.findById(id).then((user) => {
			switch (user.rol) {
				case 'company':
					res.redirect('/empresa/crear')
					break
				case 'client':
					res.redirect('/eventos')
					break
				case 'unknown':
					res.redirect('/sign-up/rol')
					break
			}
		})
	}
)

module.exports = router
