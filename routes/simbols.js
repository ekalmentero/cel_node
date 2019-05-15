var models = require('..models');
var express = require('express');
var router = express.Router();

    
router.post('create', function(req, res) {
        models.Simbol.create({
            simbolId: req.body.simbolId 
        }).then(function() {
            res.redirect('/');
        });
    });

    router.get('/:simbolId/destroy', function(req,res) {
        models.Simbol.destroy({ 
               where: {
                   id: req.params.simbol_id
               } 

        }).then(function(){
            res.redirect('/');
        });
    });