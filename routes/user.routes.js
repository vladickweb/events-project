const router = require("express").Router()
const mongoose = require("mongoose")
const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth").OAuthStrategy
const session = require("express-session")
const User = require("../models/User.model")
const Group = require("../models/Group.model")

router.get("/", (req, res) => {
  res.send(req.session.currentUser)
})

router.get("/editar-perfil", (req, res) => {
  // TODO: FORMULARIO DE EDICIÓN DE PERFIL CON SUS DATOS
})

router.post("/editar-perfil", (req, res) => {
  // TODO: FORMULARIO DE ENVIO DE PERFIL CON LOS DATOS
})

router.get("/buscar-usuarios", (req, res) => {
  User.find({rol: "client"})
    .then((clients) => res.render("admin/list-clients", {clients}))
    .catch((err) => console.log(err))
})

router.post("/buscar-usuarios/:id/agregar", (req, res) => {
  // TODO: AÑADIR USUARIOS A AMIGOS
  const user = req.session.currentUser
  const {id} = req.body

  User.findByIdAndUpdate(user._id, {$push: {friends: id}}, {new: true})
    .then((user) => {
      req.session.currentUser = user
      res.redirect("/user/buscar-usuarios")
    })
    .catch((err) => console.log(err))
})

// TODO: PODER BORRAR AMIGOS Y QUE EN LA VISTA PRINCIPAL CAMBIE EL BOTON DE AGREGAR AL DE BORRAR AMIGO

router.get("/amigos", (req, res) => {
  const id = req.session.currentUser._id
  // res.send(id)

  User.findById(id)
    .populate("friends")
    .then((user) => res.render("user/friends", user))
    .catch((err) => console.log(err))
})

router.get("/grupos", (req, res) => {
  // TODO: listado de grupos ---------- ERRROR SI ESTÁ VACÍO
  const id = req.session.currentUser._id

  Group
    .find({owner: id})
    .then((groups) => res.render("group/list-groups", { groups }))
    .catch((err) => console.log(err))
})

router.get("/grupos/crear", (req, res) => {
  const id = req.session.currentUser._id

  User.findById(id)
    .populate("friends")
    .then((user) => res.render("group/create", user))
    .catch((err) => console.log(err))
})

router.post("/grupos/crear", (req, res) => {
  const {title, users} = req.body
  const owner = req.session.currentUser._id

  Group.create({title, users, owner})
    .then(res.redirect('/user/grupos'))
    .catch((err) => console.log(err))
})

router.get("/grupos/:id", (req, res) => {
  const { id } = req.params
  
  Group
    .findById(id)
    .then(group => res.render('group/chat'))
    .catch(err => console.log(err))

})
module.exports = router
