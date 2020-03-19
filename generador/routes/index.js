var express = require('express');
var router = express.Router();

var Zombie = require("../models/zombie");
var Cerebro = require("../models/cerebro");

/* GET home page. */
router.get('/', function(req, res, next) {
    Zombie.find().exec(function(error,zombies){
        if(!error){
        console.log(zombies);
        res.render('index', { title: 'Colección de Zombies', coleccion: zombies});
        }
    });  
});

router.get('/zombies/add', function(req, res){
    res.render('add', {mensajeError: '', mensajeExito: ''});
});

router.post('/zombies/new', function(req, res){
    var data = req.body;

    var nuevoZombie = new Zombie({
        name: data.name,
        email: data.email,
        type: data.type
    });
    nuevoZombie.save(function(error){
        if(error){
            var mensaje = error.message;
            res.render('add', {mensajeError: mensaje, mensajeExito: ''});
        }
        else {
            res.render('add', {mensajeError:'', mensajeExito: 'Se agregó un nuevo zombie!'});
        }
    });
});

router.get("/prueba",function(req, res){
    res.send("<h1>Esto es una prueba.</h1>");
});

router.get("/cerebros",function(req, res){
    Cerebro.find().exec(function(error,cerebros){
        if(!error){
        console.log(cerebros);
        res.render('cerebros/index.ejs', { title: 'Colección de Cerebros', coleccion: cerebros});
        }
    });
});

router.get('/cerebros/add', function(req, res){
    res.render('cerebros/add.ejs', {mensajeErrorC: '', mensajeExitoC: ''});
});

router.post('/cerebros/new', function(req, res){
    var dataC = req.body;

    var nuevoCerebro = new Cerebro({
        flavor: dataC.flavor,
        description: dataC.description,
        iq: dataC.iq,
        picture: dataC.picture
    });
    nuevoCerebro.save(function(error){
        if(error){
            var mensajeC = error.message;
            res.render('cerebros/add.ejs', {mensajeErrorC: mensajeC, mensajeExitoC: ''});
        }
        else {
            res.render('cerebros/add.ejs', {mensajeErrorC:'', mensajeExitoC: 'Se agregó un nuevo cerebro!'});
        }
    });
});

router.get('/zombies/edit/:id', async function(req, res){
    var zombie = await Zombie.findById(req.params.id);

    res.render('edit', { zombie: zombie });
});

router.put('/zombies/edit/:id', async function(req, res){
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.name = req.body.name;
        zombie.email = req.body.email;
        zombie.type = req.body.type;
        
        await zombie.save(function(error){
            if(error){
                var mensajeC = error.message;
                res.render('edit', { zombie: zombie, mensajeErrorC: mensajeC});
            }
            else {
                res.redirect('/');
            }
        });

    } catch (e) {
        res.render('edit', { zombie: zombie});
    }
});

router.get('/zombies/delete/:id', async function(req, res){
    var zombie = await Zombie.findById(req.params.id);

    res.render('delete', { zombie: zombie });
});

router.delete('/zombies/delete/:id', async function(req, res){
    try {
        var zombie = await Zombie.findById(req.params.id);
        zombie.remove();

        res.redirect('/');
    } catch (e) {
        res.render('delete', { zombie: zombie});
    }
});

router.get('/cerebros/edit/:id', async function(req, res){
    var cerebro = await Cerebro.findById(req.params.id);

    res.render('cerebros/edit.ejs', { cerebro: cerebro, mensajeErrorC: '', mensajeExitoC: '' });
});

router.put('/cerebros/edit/:id', async function(req, res){
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.flavor = req.body.flavor;
        cerebro.description = req.body.description;
        cerebro.iq = req.body.iq;
        cerebro.picture = req.body.picture;

        await cerebro.save(function(error){
            if(error){
                var mensajeC = error.message;
                res.render('cerebros/edit', { cerebro: cerebro, mensajeErrorC: mensajeC});
            }
            else {
                res.redirect('/cerebros');
            }
        });

    } catch (e) {
        res.render('cerebros/edit.ejs', { cerebro: cerebro, mensajeErrorC: ''});
    }
});

router.get('/cerebros/delete/:id', async function(req, res){
    var cerebro = await Cerebro.findById(req.params.id);

    res.render('cerebros/delete.ejs', { cerebro: cerebro });
});

router.delete('/cerebros/delete/:id', async function(req, res){
    try {
        var cerebro = await Cerebro.findById(req.params.id);
        cerebro.remove();

        res.redirect('/cerebros');
    } catch (e) {
        res.render('cerebros/delete.ejs', { cerebro: cerebro });
    }
});

module.exports = router;
