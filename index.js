const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const express = require("express");

dotenv.config();

mongoose.connect(process.env.DB, {}).then(() => {
  console.log("conexion a la base de datos exitosa");
});



const app = express();

// app.use(cors({ origin: '*'}));
app.use(express.json());
// app.options('*', cors());

const RutaProducto = require('./routes/ProductRoute')

app.use('/api/producto', RutaProducto)

app.listen(process.env.PORT,() =>{
  console.log('La aplicacion esta corriendo en el puerto:', process.env.PORT);
})

