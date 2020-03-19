var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [12, "La descripcion es muy corta"],
        maxlength: [40, "El nombre es muy larga"]
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"]
    },
    password: {
        type: String,
        minlength: [6, "La contraseña es muy corta"],
        maxlength: [24, "La contraseña es muy larga"]
    }
});

var Usuario = mongoose.model("Usuario", modelSchema);
module.exports = Usuario; 