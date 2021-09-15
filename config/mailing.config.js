const nodemailer = require('nodemailer')

let transporter = nodemailer.createTransport({
	service: 'Gmail',
	auth: {
		user: process.env.NODE_MAILER_USER,
		pass: process.env.NODE_MAILER_PASS,
	},
})

module.exports = transporter
