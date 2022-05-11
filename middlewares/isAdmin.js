const isAdmin = (req, res, next) => {

  console.log(req.session.user)
  if (req.session.user.admin === false) {
    res.redirect("/auth/login")
  } else {
    next() // continua con la ruta
  }
}



module.exports = isAdmin