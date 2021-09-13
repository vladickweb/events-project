const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
const session = require('express-session');



router.get('/login', (req, res) => {
    res.render('auth/login')
})

router.post('/login', (req, res) => {
    res.send(req.body)
})



router.get('/sign-up', (req, res) => {
    // TODO: 
})

router.post('/sign-up', (req, res) => {
    //TODO:
})






module.exports = router;
