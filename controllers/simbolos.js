var models  = require('../models/index');

exports.simbolo_create= function(req, res) {
  models.Simbolo.create({
    nome: req.body.nome,
    nocao: req.body.nocao,
    impacto: req.body.impacto,
    classificacao: req.body.classificacao
  }).then(() => {
    res.status(200).send('Simbolo cadastrado com sucesso!');

  });
},
exports.simbolo_delete= function(req, res) {
  models.Simbolo.destroy({
    where: {
      id: req.params.simbolo_id
    }
  }).then(function() {
    res.status(200).send('Simbolo excluído com sucesso!');
  });
},
exports.sinonimo_create= function(req, res) {
  models.Sinonimo.create({
    nome: req.body.nome,
    SimboloId: req.params.SimboloId
  }).then(function() {
    res.status(200).send('Sinonimo cadastrado com sucesso!');
  });
},
exports.sinonimo_delete= function (req, res) {
  models.Sinonimo.destroy({
    where: {
      id: req.params.sinonimo_id
    }
  }).then(function() {
    res.status(200).send('Sinonimo excluído com sucesso!');
  });
}