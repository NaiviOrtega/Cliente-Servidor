var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get("/buena_onda", function(req, res, next){
  res.render('alumnos',{title:'Alumnos', alum:'Los alumnos del A no son muy buenos en AOEII', 
  alum2:'Los alumnos del A son más buena onda que los del B', numero:'todos menos el oscar'});
});

module.exports = router;
