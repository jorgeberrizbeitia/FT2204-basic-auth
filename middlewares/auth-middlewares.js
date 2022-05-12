module.exports = {

  isAdmin: (req, res, next) => {

    console.log(req.session.user)
    if (req.session.user.admin === true) {
      next() // continua con la ruta
    } else {
      res.redirect("/auth/login")
    }
  },

  isLoggedIn: (req, res, next) => {
    console.log(req.session)
    if (req.session.user) {
      next() // continua con la ruta
    } else {
      res.redirect("/auth/login")
    }
  }

}