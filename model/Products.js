const {Schema, model} = require('mongoose');

const ProductSchema = Schema ({
    nombre : {
        type: String,
        require: true
    },
    descripcion: {
        type: String,
        require: true
    },
    precio: {
        type: Number,
        require: true,
    },
    imagen: {
        type: String,
        require: true
    }
})

module.exports = model('Product', ProductSchema )

