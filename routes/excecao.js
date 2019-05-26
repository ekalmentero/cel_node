var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET exceção listing. */
router.get('/', function(req, res, next) {
  model.Excecao.findAll({})
  	.then(excecaos => res.json({
  		error: false,
  		data: excecaos
  	}))
  	.catch(error => res.json({
  		error: true,
  		data: [],
  		error: error
  	}));
});

/* POST exceção created */
router.post('/', function(req, res, next) {
  const{
    Nome,
    Descricao,
    Tratamento
  } = req.body;
  model.Excecao.create({
    Nome: Nome,
    Descricao: Descricao,
    Tratamento: Tratamento
  })
    .then(excecao => res.status(201).json({
      error: false,
      data: excecao,
      message: 'Nova exceção cadastrada!'
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

/* PUT exceção update */
router.put('/:id', function(req, res, next) {
  const excecao_id = req.params.id;
  const {Nome, Descricao, Tratamento} = req.body;
  model.Excecao.update({
    Nome: Nome,
    Descricao: Descricao,
    Tratamento: Tratamento
  }, {
      where: {
        id: excecao_id
      }
  })
    .then(excecao => res.status(201).json({
      error: false,
      message: 'Exceção atualizada com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});

/* DELETE exceção deleted */
router.delete('/:id', function(req, res, next) {
  const excecao_id = req.params.id;
  model.Excecao.destroy({ where: {
      id: excecao_id
    }})
    .then(status => res.status(201).json({
      error: false,
      message: 'Exceção excluída com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});


module.exports = router;
