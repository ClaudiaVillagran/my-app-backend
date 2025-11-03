const productModel = require("../model/Products");

async function CreateProduct(req, res) {
  const { nombre, descripcion, precio, imagenUrl } = req.body;
  console.log("nombre");
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

async function EliminarProducto(req, res) {
  const productoId = req.params.id;

  try {
    const productoEliminar = await productModel.findByIdAndDelete(productoId);

    if (productoEliminar) {
      res.status(201).json({
        status: "success",
        message: "Producto eliminado con exito",
        productoEliminar,
      });
    }
  } catch (error) {
    console.log("503, error al eliminar el producto", productoId);
  }
}

// editarProducto
async function EditarProducto(req, res) {
  try {
    const { id } = req.params;
    const { data } = req.body;

    // id= 'ndshsbw1213'
    // data= {
    //   nombre:'zapatilla',
    //   descripcion: 'para correr comodamente'
    // }

    // productModel= {
    //   'nombre': 'zapato',
    //   'descripcion': 'para correr'
    // }

    const productoEditado = await productModel.findByIdAndUpdate(id, data);

    // editarProducto ={
    //   nombre: 'zapatilla',
    //   descripcion: 'para correr comodamente',
    // }

    if (productoEditado) {
      res.status(201).json({
        status: "success",
        message: "Producto editado con exito",
        productoEditado,
      });
    }
  } catch (error) {
     console.log("503, error al eliminar el producto", productoId);
  }
}

// traerTodosLosProductos

// traerUnProductoEspecifico

module.exports = {
  CreateProduct,
  EliminarProducto,
};
