const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;
const session = require("express-session");
const fileUploader = require("../config/cloudynary.config");
const event = require("../models/Event.model");

router.get("/crear", (req, res) => {
  // TODO: VISTA FORMULARIO PARA CREAR EVENTO
  res.render("events/create-event");
});

router.post("/crear", fileUploader.single("event-cover-image"), (req, res) => {
  // TODO: FORMULARIO DE CREACIÓN DE EVENTO
  const { title, direction, description, category, location } = req.body;
  console.log(req.body);
  event
    .create({
      title,
      direction,
      description,
      category,
      location,
      image: req.file.path
    })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.get("/perfil", (req, res) => {
  // TODO: PERFIL DE LA EMPRESA CON SUS EVENTOS
});

router.get("/:id", (req, res) => {
  // TODO: MOSTRAR EVENTO CON SUS DATOS
});

router.post("/:id", (req, res) => {
  // TODO: EDITAR EVENTO
});

router.post("/estadisticas", (req, res) => {
  // TODO: VISTA PARA VER ESTADÍSTICAS DE RESERVAS
});

module.exports = router;
