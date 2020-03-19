var express = require("express");
var app = express();
var path = require("path");
var fs = require("fs");

app.use((req, res, next) => {
    var filePath = path.join(__dirname, "files", req.url);
    fs.stat(filePath, function(err, fileInfo){
        if(err){
            next();
            return;
        }

        if(fileInfo.isFile()){
            res.sendFile(filePath);
        }
        else {
            next();
        }
    });
});

app.use((req, res) => {
    res.status(404);
    res.send("Archivo no encontrado!");
});

app.listen("3000", () => 
    console.log("La aplicación de fotos inició por el puerto 3000")
);