const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;
const session = require("express-session");
const User = require("../models/User.model");

router.get("/", (req, res) => {
  const id = req.session.currentUser._id;
  User.findById(id)
    .then((user) => res.render("user/profile", user))
    .catch((err) => console.log(err));
});

router.get("/editar-perfil/:id", (req, res) => {
  // TODO: FORMULARIO DE EDICIÓN DE PERFIL CON SUS DATOS

  const { id } = req.params
  User.findById(id)
    .then((user) => res.render("user/edit-user", user))
    .catch((err) => console.log(err));
});

router.post("/editar-perfil/:id", (req, res) => {
  // TODO: FORMULARIO DE ENVIO DE PERFIL CON LOS DATOS
    const { id } = req.params;
    const { name } = req.body;



   User.findByIdAndUpdate(id, { name }, { new: true })
     .then(res.redirect("/"))
     .catch((err) => console.log(err));
});

router.get("/buscar-usuarios", (req, res) => {
  // TODO: LISTADO DE USUARIOS Y BÚSQUEDA DE AMIGOS
});

router.post("/buscar-usuarios", (req, res) => {
  // TODO: AÑADIR USUARIOS A AMIGOS
});

router.get("/grupos", (req, res) => {
  // TODO: BOTON DE CREAR GRUPO Y SELECCIONAR A PERSONAS PARA EL GRUPO
});

router.post("/grupos", (req, res) => {
  // TODO: AÑADIR A AMIGOS AL GRUPO
});

router.get("/chat", (req, res) => {
  // TODO: RENDERIZAR CHAT DE GRUPO
});

module.exports = router;
