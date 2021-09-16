require('dotenv/config')
const passportSetup = require('./config/passport.config')
const passport = require('passport')
const authRoutes = require('./routes/auth.routes')

const express = require('express')
const session = require('express-session')
const app = express()
require('./config')(app)
require('./config/session.config')(app)

app.use(passport.initialize())
app.use(passport.session())

require('./db')

const projectName = 'events-project'

app.locals.siteTitle = projectName
app.locals.isLoggedIn = ""

require('./routes')(app)

require('./error-handling')(app)

module.exports = app
