const productModel = require("../model/Products");

async function CreateProduct(req, res) {
  const { nombre, descripcion, precio, imagenUrl } = req.body;
  console.log('nombre');
  console.log(nombre);

  try {
    const nuevoProducto = new productModel({
      nombre,
      descripcion,
      precio,
      imagen: imagenUrl,
    });

    const productoGuardado = await nuevoProducto.save();

    if (productoGuardado) {
      res.status(201).json({
        status: "success",
        message: "Producto guardado con exito",
        productoGuardado,
      });
    }
  } catch (error) {
    console.log("503, error de servidor", error);
  }
}


module.exports ={
    CreateProduct
}