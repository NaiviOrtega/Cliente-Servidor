var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: [12, "La descripcion es muy corta"],
        maxlength: [40, "El nombre es muy larga"],
        required: [true, "El nombre es obligatorio"]
    },
    email: {
        type: String,
        required: [true, "El correo electrónico es obligatorio"]
    },
    password: {
        type: String,
        minlength: [6, "La contraseña es muy corta"],
        maxlength: [24, "La contraseña es muy larga"],
        required: [true, "La contraseña es obligatoria"]
    },
    type: {
        type: String,
        enum: ["Administrador", "Normal"],
        required: [true, "El tipo de zombie es obligatorio"]
    }
});

var Usuario = mongoose.model("Usuario", modelSchema);
module.exports = Usuario; 