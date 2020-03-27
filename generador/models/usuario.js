var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [5, "La nombre es muy corta"],
        maxlength: [12, "El nombre es muy larga"],
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"]
    },
    password: {
        type: String,
        minlength: [6, "La contraseña es muy corta"],
        maxlength: [100, "La contraseña es muy larga"],
        required: [true, "La contraseña es obligatoria"]
    },
    picture: {
        type: String,
        minlength: [6, "El nombre de la imagen es muy corto"],
        maxlength: [100, "El nombre de la imagen es muy largo"],
        required: [true, "El nombre de la imagen es obligatorio"]
    }
});

var Usuario = mongoose.model("Usuario", modelSchema);
module.exports = Usuario; 