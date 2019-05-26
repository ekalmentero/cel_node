var express = require('express');
var router = express.Router();
var model = require('../models/index');

/* GET cenário listing. */
router.get('/', function(req, res, next) {
  model.Cenario.findAll({ include: [{ all: true, nested: true }]})
  	.then(cenarios => res.json({
  		error: false,
  		data: cenarios
  	}))
  	.catch(error => res.json({
  		error: true,
  		data: [],
  		error: error
  	}));
});

/* POST cenário created */
router.post('/', function(req, res, next) {
  const{
    Titulo
  } = req.body;
  model.Cenario.create({
    Titulo: Titulo
  })
    .then(cenario => res.status(201).json({
      error: false,
      data: cenario,
      message: 'Novo cenário cadastrado!'
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

/* PUT cenário update */
router.put('/:id', function(req, res, next) {
  const cenario_id = req.params.id;
  const {Titulo} = req.body;
  model.Cenario.update({
    Titulo
  }, {
      where: {
        id: cenario_id
      }
  })
    .then(cenario => res.status(201).json({
      error: false,
      message: 'Cenário atualizado com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});

/* DELETE cenário deleted */
router.delete('/:id', function(req, res, next) {
  const cenario_id = req.params.id;
  model.Cenario.destroy({ where: {
      id: cenario_id
    }})
    .then(status => res.status(201).json({
      error: false,
      message: 'Cenário excluído com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});


/*----------------------------- CONTEXTO ---------------------------------*/

/* GET contexto by cenário listing. */
router.get('/:id/contexto', function(req, res, next) {
  model.Contexto.findAll({
    where: {
      cenarioId: req.params.id
    }
  })
    .then(contextos => res.json({
      error: false,
      data: contextos
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

/* POST contexto by cenário created */
router.post('/:id/contexto', function(req, res, next) {
  model.Contexto.count({
    where: {
      cenarioId: req.params.id
    }
  })
    .then(function(dado){
      if(dado == 0){
        const{
          Titulo,
          Descricao
        } = req.body;
        model.Contexto.create({
          Titulo: Titulo,
          Descricao: Descricao,
          cenarioId: req.params.id
        })
          .then(contexto => res.status(201).json({
            error: false,
            data: contexto,
            message: 'Contexto cadastrado!'
          }))
          .catch(error => res.json({
            error: true,
            data: [],
            error: error
          }));
      }else{
        return res.status(200).send('Cenário já possui um contexto cadastrado!');
      }
    });
});

/* PUT contexto by cenário update */
router.put('/:id/contexto', function(req, res, next) {
  const {Titulo, Descricao} = req.body;
  model.Contexto.update({
    Titulo: Titulo,
    Descricao: Descricao
  }, {
      where: {
        cenarioId: req.params.id
      }
  })
    .then(contexto => res.status(201).json({
      error: false,
      message: 'Contexto Atualizado com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});

/* DELETE contexto by cenário deleted */
router.delete('/:id/contexto', function(req, res, next) {
  model.Contexto.destroy({ where: {
      cenarioId: req.params.id
    }})
    .then(status => res.status(201).json({
      error: false,
      message: 'Contexto excluído com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});



/*----------------------------- EPISÓDIO ---------------------------------*/

/* GET episódio by cenário listing. */
router.get('/:id/episodio', function(req, res, next) {
  model.Episodio.findAll({
    where: {
      cenarioId: req.params.id
    }
  })
    .then(episodios => res.json({
      error: false,
      data: episodios
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

/* POST episódio by cenário created */
router.post('/:id/episodio', function(req, res, next) {
  const{
    Titulo,
    Tipo
  } = req.body;
  var verTipo = req.body.Tipo;
  if(verTipo.toUpperCase() == 'CONDICIONAL' || verTipo.toUpperCase() == 'OPCIONAL' || verTipo.toUpperCase() == 'SEQUENCIAL' || verTipo.toUpperCase() == 'NÃO SEQUENCIAL'){
    model.Episodio.create({
      Titulo: Titulo,
      Tipo: Tipo,
      cenarioId: req.params.id
    })
      .then(episodio => res.status(201).json({
        error: false,
        data: episodio,
        message: 'Novo episódio Cadastrado!'
      }))
      .catch(error => res.json({
        error: true,
        data: [],
        error: error
      }));
  }else{
    return res.status(200).send('Campo Tipo inválido. Tipo pode ser: condicional, opcional, sequencial ou não sequencial!!!');
  }
});

/* PUT episódio by cenário update */
router.put('/:id/episodio/:idEpisodio', function(req, res, next) {
  const episodio_id = req.params.idEpisodio;
  const {Titulo, Tipo} = req.body;
  model.Episodio.update({
    Titulo: Titulo,
    Tipo: Tipo
  }, {
      where: {
        id: episodio_id
      }
  })
    .then(episodio => res.status(201).json({
      error: false,
      message: 'Episódio Atualizado com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});

/* DELETE episódio by cenário deleted */
router.delete('/:id/episodio/:idEpisodio', function(req, res, next) {
  const episodio_id = req.params.idEpisodio;
  model.Episodio.destroy({ where: {
      id: episodio_id
    }})
    .then(status => res.status(201).json({
      error: false,
      message: 'Episódio excluído com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});


/*----------------------------- CENÁRIO_ATOR ---------------------------------*/

/* GET cenário_ator by cenário listing. */
router.get('/:id/ator', function(req, res, next) {
  model.Cenario_Ator.findAll({
    where: {
      CenarioId: req.params.id
    }
  })
    .then(cenario_ators => res.json({
      error: false,
      data: cenario_ators
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

/* POST cenário_ator by cenário created */
router.post('/:id/ator/:idAtor', function(req, res, next) {
  model.Cenario_Ator.create({
    CenarioId: req.params.id,
    AtorId: req.params.idAtor
  })
    .then(cenario_ator => res.status(201).json({
      error: false,
      data: cenario_ator,
      message: 'Ator cadastrado no cenário!'
    }))
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
});

/* DELETE cenário_ator by cenário deleted */
router.delete('/:id/ator/:idAtor', function(req, res, next) {
  model.Cenario_Ator.destroy({ where: {
      CenarioId: req.params.id,
      AtorId: req.params.idAtor
    }})
    .then(status => res.status(201).json({
      error: false,
      message: 'Ator excluído do cenário com sucesso!'
    }))
    .catch(error => res.json({
      error: true,
      error: error
    }));
});



module.exports = router;
