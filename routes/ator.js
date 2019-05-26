var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET ator listing. */
router.get('/', function(req, res, next) {
  model.Ator.findAll({})
  	.then(ators => res.json({
  		error: false,
  		data: ators
  	}))
  	.catch(error => res.json({
  		error: true,
  		data: [],
  		error: error
  	}));
});

/* POST ator created */
router.post('/', function(req, res, next) {
  const{
    Nome,
    Sobrenome,
    email
  } = req.body;
  model.Ator.create({
    Nome: Nome,
    Sobrenome: Sobrenome,
    email: email
  })
    .then(ator => res.status(201).json({
      error: false,
      data: ator,
      message: 'Novo ator cadastrado!'
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

/* PUT ator update */
router.put('/:id', function(req, res, next) {
  const ator_id = req.params.id;
  const {Nome, Sobrenome, email} = req.body;
  model.Ator.update({
    Nome: Nome,
    Sobrenome: Sobrenome,
    email: email
  }, {
      where: {
        id: ator_id
      }
  })
    .then(ator => res.status(201).json({
      error: false,
      message: 'Ator atualizado com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});

/* DELETE ator deleted */
router.delete('/:id', function(req, res, next) {
  const ator_id = req.params.id;
  model.Ator.destroy({ where: {
      id: ator_id
    }})
    .then(status => res.status(201).json({
      error: false,
      message: 'Ator excluído com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});


module.exports = router;
