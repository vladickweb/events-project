require("dotenv/config");
const passportSetup = require("./config/passport.config");
const passport = require("passport");
const authRoutes = require("./routes/auth.routes");


const express = require("express");
const session = require('express-session');
const app = express();
require("./config")(app);
require('./config/session.config')(app) 


// initialize passport
app.use(passport.initialize());
app.use(passport.session());
// app.use("/auth", authRoutes);

require("./db");


const hbs = require("hbs");



const projectName = "events-project";

app.locals.siteTitle = projectName;

require('./routes')(app)

// app.use("/", index);

require("./error-handling")(app);

module.exports = app;