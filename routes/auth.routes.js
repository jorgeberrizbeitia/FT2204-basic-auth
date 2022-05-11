const router = require("express").Router();

const bcryptjs = require("bcryptjs")
const UserModel = require("../models/User.model.js")

// aqui nuestras 4 rutas para el sistema de autenticacion

// GET "/auth/signup" => renderizar el form de signup
router.get("/signup", (req, res, next) => {
  res.render("auth/signup.hbs")
})

// POST "/auth/signup" => recibir los datos de usuario y crearlo/registrarlo
router.post("/signup", async (req, res, next) => {

  console.log(req.body)
  const { username, email, password } = req.body

  // VALIDACION DE BACKEND

  // validar si la informacion está completa
  if (username === "" || email === "" || password === "") {
    res.render("auth/signup", {
      errorMessage: "debes rellenar todos los campos",
    })
    return; // hasta aqui llega mi ruta
  }

  // optional. Validar si el correo tiene formato correcto

  // validar si la contraseña es suficientemente segura
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
  if (passwordRegex.test(password) === false) {
    res.render("auth/signup", {
      errorMessage: "contraseña no valida, necesita 8 char, una letra y un numero"
    })
    return; // hasta aqui llega mi ruta
  }


  try {
    
    // UNA ULTIMA VALIDACION SUPER IMPORTANTE
    const foundUser = await UserModel.findOne({ $or: [{email: email}, {username: username}] })
    console.log(foundUser) // null
    if (foundUser !== null) {
      res.render("auth/signup", {
        errorMessage: "usuario ya registrado"
      })
      return; // hasta aqui llega mi ruta
    }

    // CREAR EL USUARIO EN LA DB
    
    //... pero primero, encriptamos la contraseña
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password, salt)
    console.log(hashPassword)
    
    const createdUser = await UserModel.create({
      username,
      email,
      password: hashPassword
    })

  
    // esto será lo ultimo
    res.redirect("/auth/login")

  } catch(err) {
    next(err)
  }
})

// GET "/auth/login" => renderizar el form de login
router.get("/login", (req, res, next) => {
  res.render("auth/login.hbs")
})

// POST "/auth/login" => recibir las credenciales del usuario y validarlo


module.exports = router;