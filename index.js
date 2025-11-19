const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

dotenv.config();

mongoose.connect(process.env.DB, {}).then(() => {
  console.log("conexion a la base de datos exitosa");
});



const app = express();

app.use(express.json());
app.use(cors());
// app.use(cors({ origin: '*'}));
// app.options('*', cors());

const RutaProducto = require('./routes/ProductRoute')

const RutaUsuario = require('./routes/UserRoute')

app.use('/api/producto', RutaProducto)
app.use('/api/usuario', RutaUsuario)

app.listen(process.env.PORT,() =>{
  console.log('La aplicacion esta corriendo en el puerto:', process.env.PORT);
})

