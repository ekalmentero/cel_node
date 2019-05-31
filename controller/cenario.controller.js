var model = require("../models/index");

exports.viewAll = (req, res) => {
  model.Cenario.findAll({ include: [{ all: true, nested: true }] })
    .then(cenarios =>
      res.json({
        error: false,
        data: cenarios
      })
    )
    .catch(error =>
      res.json({
        error: true,
        data: [],
        error: error
      })
    );
};

exports.updateAtor = (req, res) => {
  const id = req.params.id;
  const idator = req.params.idator;
  model.Ator.update(
    { nome: req.body.nome },
    {
      where: {
        id: req.params.idator,
        cenarioId: req.params.id
      }
    }
  ).then(() => {
    res.status(200).send("updated.");
  });
};

exports.updateContexto = (req, res) => {
  const idcenario = req.params.id;
  const idcontexto = req.params.idcontexto;
  model.Contexto.update(
    { Descricao: req.body.descricao },
    {
      where: {
        id: req.params.idcontexto,
        cenarioId: req.params.id
      }
    }
  ).then(() => {
    res.status(200).send("updated.");
  });
};

exports.updateEpisodio = (req, res) => {
  const idcenario = req.params.id;
  const idepisodio = req.params.idepisodio;
  model.Episodio.update(
    { descricao: req.body.descricao, tipo: req.body.tipo },
    {
      where: {
        id: req.params.idepisodio,
        cenarioId: req.params.id
      }
    }
  ).then(() => {
    res.status(200).send("updated.");
  });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  model.Cenario.destroy({
    where: { id: id }
  }).then(() => {
    res.status(200).send("Cenário com o id=" + id + " deletado com sucesso");
  });
};

// UPDATE cenarios
exports.updateCenario = (req,res) =>{
	const id = req.params.id_cenario;
	const titulo = req.body;
	model.Cenario.update({
		titulo:titulo
	},{
		where:{
			id:id
		}
	})
	.then(cenario => res.status(201).json({
		error:false,
		message: 'Cenario atualizado'
	}))
	.catch(e => res.json({
		error: true,
		error:e
	}))
}

//UPDATE excecoes

exports.updateExec = (req,res) =>{
  const idcenario = req.params.id;
  const id_exec = req.params.id_exec;
  model.Excecao.update(
    { descricao: req.body.descricao },
    {
      where: {
        id: id_exec,
        cenarioId: idcenario
      }
    }
  ).then(() => {
    res.status(200).send("updated.");
  });
};

exports.updateRecursos= (req,res) =>{
  const idcenario = req.params.id;
  const id_recurso = req.params.id_recurso;
  model.Recurso.update(
    { descricao: req.body.descricao },
    {
      where: {
        id: id_recurso,
        cenarioId: idcenario
      }
    }
  ).then(() => {
    res.status(200).send("updated.");
  });
}


