var models  = require('../models');
var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  models.Simbolo.findAll({
  }).then(function(simbolos) {
   res.render('index', {
   simbolos: simbolos
  });
});
});

module.exports = router;
