const isLoggedIn = (req, res, next) => {
  console.log(req.session)
  if (req.session.user) {
    next() // continua con la ruta
  } else {
    res.redirect("/auth/login")
  }
}



module.exports = isLoggedIn