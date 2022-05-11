const router = require("express").Router();

const isLoggedIn = require("../middlewares/isLoggedIn.js")

// aqui van nuestras rutas privadas
router.get("/", isLoggedIn, (req, res, next) => {

  // EN TODAS LAS RUTAS, YO VOY A TENER ACCESSO A REQ.SESSION
  // la session solo está activa si tanto la session como el cookie estan presentes
  res.render("profile/index.hbs")

})


module.exports = router;