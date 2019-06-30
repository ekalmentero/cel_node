var models  = require('../models/index');

exports.simbolo_find= function(req, res) {
    models.Simbolo.findAll({
    }).then(function(simbolos) {
     res.render('index', {
     simbolos: simbolos
    });
  });
  };

