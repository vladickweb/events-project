const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const router = express.Router();
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;


router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}));

router.get("/google/redirect", passport.authenticate('google'), (req, res, next) => {
    user = req.user
    req.session.currentUser = user
    res.send(user)
});


module.exports = router;

