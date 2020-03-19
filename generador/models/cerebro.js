var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    flavor: {
        type: String,
        minlength: [5, "El nombre del sabor es muy corto"],
        maxlength: [12, "El nombre del sabor es muy largo"]
    },
    description: {
        type: String,
        minlength: [12, "La descripcion es muy corta"],
        maxlength: [40, "El nombre es muy larga"]
    },
    iq: {
        type: Number,
        minlength: [1, "El iq es muy corto"],
        maxlength: [3, "El iq es muy largo"]
    },
    picture: {
        type: String,
        minlength: [6, "El nombre es muy corto"],
        maxlength: [24, "El nombre es muy largo"]
    }
});

var Cerebro = mongoose.model("Cerebro", modelSchema);
module.exports = Cerebro; 