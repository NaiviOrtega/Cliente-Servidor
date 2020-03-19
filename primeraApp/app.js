var express = require("express");
var app = express();

app.get("/la_verdad", (req, res) =>
    res.send("<h1>Los alumnos del A son más inteligentes que los del B</h1>")
);

app.listen(3000, () =>
    console.log("La aplicación inició en el puerto 3000...")
);