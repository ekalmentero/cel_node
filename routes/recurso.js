var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET recurso listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  model.Recurso.findAll({})
  	.then(recursos => res.json({
  		error: false,
  		data: recursos
  	}))
  	.catch(error => res.json({
  		error: true,
  		data: [],
  		error: error
  	}));
});

/* POST recurso created */
router.post('/', function(req, res, next) {
  const{
    Nome,
    Descricao
  } = req.body;
  model.Recurso.create({
    Nome: Nome,
    Descricao: Descricao,
    alocado: false
  })
    .then(recurso => res.status(201).json({
      error: false,
      data: recurso,
      message: 'Novo recurso cadastrado!'
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

/* PUT recurso update */
router.put('/:id', function(req, res, next) {
  const recurso_id = req.params.id;
  const {Nome, Descricao} = req.body;
  model.Recurso.update({
    Nome: Nome,
    Descricao: Descricao
  }, {
      where: {
        id: recurso_id
      }
  })
    .then(recurso => res.status(201).json({
      error: false,
      message: 'Recurso atualizado com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});

/* DELETE recurso deleted */
router.delete('/:id', function(req, res, next) {
  const recurso_id = req.params.id;
  model.Recurso.destroy({ where: {
      id: recurso_id
    }})
    .then(status => res.status(201).json({
      error: false,
      message: 'Recurso excluído com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});


module.exports = router;
