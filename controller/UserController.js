const UserModel = require("../model/User");

const bcrypt = require('bcrypt');


async function RegisterUser(req, res) {
  const { nombre, email, contraseña } = req.body;

  try {
    const contraseñaEncriptada =  await bcrypt.hash(contraseña, 10)

    const nuevoUsuario = new UserModel({
        nombre,
        email,
        contraseña
    })
    
    const UsuarioGuardado = await nuevoUsuario.save()

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


module.export = {
    RegisterUser,
}
