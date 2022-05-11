const isLoggedIn = (req, res, next) => {
  console.log(req.session)
  if (!req.session.user) {
    res.redirect("/auth/login")
  } else {
    next() // continua con la ruta
  }
}

module.exports = isLoggedIn