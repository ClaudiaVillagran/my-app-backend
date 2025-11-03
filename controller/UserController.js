const UserModel = require("../model/User");

const bcrypt = require("bcrypt");

async function registerUser(req, res) {
  const { nombre, email, contraseña } = req.body;

  try {
    const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);

    const nuevoUsuario = new UserModel({
      nombre,
      email,
      contraseña: contraseñaEncriptada,
    });

    const UsuarioGuardado = await nuevoUsuario.save();

    if (UsuarioGuardado) {
      res.status(201).json({
        status: "success",
        message: "Usuario registrado con exito",
        UsuarioGuardado,
      });
    }
  } catch (error) {
    console.log("503, error de servidor", error);
  }
}

async function login(req, res) {
  const { email, contraseña } = req.body;

  try {
    const usuarioEncontrado = await UserModel.findOne({ email });


    if (!usuarioEncontrado) {
      res.status(404).json({
        status: "error",
        message: "El usuario no existe",
      });
    }
    // usuarioEncontrado= {
    //   nombre = 'claudai',
    //   email = 'usuario@gmail.com',
    //   contraseña = 'admin123'
    // }

    console.log(contraseña);
    console.log(usuarioEncontrado.contraseña);
    const contraseñaCorrecta = await bcrypt.compare(
      contraseña,
      usuarioEncontrado.contraseña
    );


    console.log(contraseñaCorrecta);

    if (!contraseñaCorrecta) {
      res.status(401).json({
        status: "error",
        message: "Contraseña incorrecta",
      });
    }

    const payload = {
      "nombre": usuarioEncontrado.nombre,
      "email": usuarioEncontrado.email
    }
    
    res.status(201).json({
      status: "success",
      message: "Usuario logeado con exito ",
      payload,
    });
  } catch (error) {
    console.log("503, error de servidor", error);
  }
}

module.exports = {
  registerUser,
    login,
};
