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


    const datacompleta = req.body;
    const data = req.body.data;
    const nombre = req.body.data.nombre

    // const {data} = req.body;

    console.log("datacompleta",datacompleta);
    
    console.log("data",data);
    
    console.log("nombre",nombre);
    // id= 'ndshsbw1213'
    // data= {
    //   nombre:'zapatilla',
    //   descripcion: 'para correr comodamente'
    // }

    // productModel= {
    //   'nombre': 'zapato',
    //   'descripcion': 'para correr'
    // }

    const productoEditado = await productModel.findByIdAndUpdate(id, data,{
      new:true
    });

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

async function TraerProductos(req, res) {
  try {
    const productos = await productModel.find();
    console.log(productos);

    if (productos.length == 0) {
      res.status(200).json({
        status: "success",
        message: "No existen productos, crea uno",
      });
    }

    if (productos) {
      // productos no es undefined
      res.status(200).json({
        status: "success",
        message: "Productos",
        productos,
      });
    }
  } catch (error) {
    res.status(503).json({
      status: "error",
      message: "Error en el servidor",
    });
  }
}

// traerUnProductoEspecifico

async function traerUnProductoEspecifico (req, res) {
  const {id} = req.params;

  try {
    const productoAMostrar = await productModel.findById(id);

    if (productoAMostrar) {
       res.status(200).json({
        status: "success",
        message: "Producto",
        producto,
      });
    }

  } catch (error) {
    
  }


}

module.exports = {
  CreateProduct,
  EliminarProducto,
  TraerProductos,
  EditarProducto
};
