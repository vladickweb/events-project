const router = require("express").Router();
const mongoose = require("mongoose");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy;
const session = require("express-session");
const fileUploader = require("../config/cloudynary.config");
const Event = require("../models/Event.model");

router.get("/crear", (req, res) => {
  // TODO: VISTA FORMULARIO PARA CREAR EVENTO
  res.render("events/create-event");
});

router.post("/crear", fileUploader.single("event-cover-image"), (req, res) => {
  // TODO: FORMULARIO DE CREACIÓN DE EVENTO

  const { title, description, category, city, country, number, lat, lng } = req.body;

  const direction = {
      city: city,
      country: country, 
      number: number
  }

  const location = {
    type: "Point",
    coordinates: [lat, lng]
  };
  const owner = req.session.currentUser._id
  
  Event
    .create({ title, direction , description, category, location, image: req.file.path, owner })
    .then(event => {
        res.redirect('/empresa/crear')
    //   res.redirect("/");
    })
    .catch((err) => console.log(err));
});

router.get("/perfil", (req, res) => {
  // TODO: PERFIL DE LA EMPRESA CON SUS EVENTOS
  const id = req.session.currentUser._id
  Event
  .find({owner: id})
    // .select("title direction description category location ")
    .then((events) =>
      res.render("company/profile", { events })
    )
    .catch((err) => console.log(err));
});

router.get("/perfil/editar", (req,res) => {


})

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
