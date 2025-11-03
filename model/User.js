const {Schema, model} = require('mongoose');

const UserSchema = Schema ({
    nombre: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true
    },
    contraseña: {
        type: String,
        require: true
    }
})

module.exports = model('User', UserSchema)