const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");

})

router.get('/parallax', (req, res) => {
  res.render('parallax')
})

module.exports = router;

