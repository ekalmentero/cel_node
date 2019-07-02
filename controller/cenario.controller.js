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

exports.view = (req, res) => {
  const { id } = req.params;
  model.Cenario.findByPk(id, { include: [{ all: true, nested: true }] }).then(
    cenario => {
      if(!cenario) {
        res.status(404).json({
          error: true,
          message: "Cenario nao existe"
        })
        return;
      }
      res.status(200).json({
        error: false,
        data: cenario
      })
    }
  ).catch(error => {
    res.status(403).json({
      error: true,
      message: "Erro ao processar requisicao"
    })
  })
}

exports.createCenario = (req, res) => {
  const{
    tituloCenario,
    descricaoContexto,
    nomeAtor,
    descricaoEpisodio,
    descricaoRecurso,
    descricaoExcecao
  } = req.body;
  model.Cenario.count({ where: {titulo: tituloCenario}})
    .then(
      function criarCenario(cenarios){
        if(cenarios == 0){
          model.Cenario.create({
            titulo: tituloCenario
          })
          .then(cenario => 
            model.Contexto.create({
                  descricao: descricaoContexto,
                  cenarioId: cenario.id
                })
                .then(function criarAtor(){
                  var ator = nomeAtor.split(',');
                  var qtdAtor = ator.length;
                  for(let i=0; i<qtdAtor;i++){
                    model.Ator.create({
                      nome: ator[i],
                      cenarioId: cenario.id
                    })
                  }})
                .then(function criarRecurso(){
                  var recurso = descricaoRecurso.split(',');
                  var qtdRecurso = recurso.length;
                  for(let i=0; i<qtdRecurso;i++){
                    model.Recurso.create({
                      descricao: recurso[i],
                      cenarioId: cenario.id
                    })
                  }})
                .then(function criarExcecao(){
                  var excecao = descricaoExcecao.split(',');
                  var qtdExcecao = excecao.length;
                  for(let i=0; i<qtdExcecao;i++){
                    model.Excecao.create({
                      descricao: excecao[i],
                      cenarioId: cenario.id
                    })
                  }})
                .then(function criarEpisodio(){
                  var episodio = descricaoEpisodio.split('/');
                  var qtdEpisodio = episodio.length;
                  for(let i=0; i<qtdEpisodio;i++){
                    var atributoEpisodio = episodio[i].split(',');
                    model.Episodio.create({
                      descricao: atributoEpisodio[0],
                      tipo: atributoEpisodio[1],
                      cenarioId: cenario.id
                    })
                  }})
                .then(contextos => res.json({
                  error: false,
                  data: cenario
                }))
                .catch(error => res.json({
                  error: true,
                  data: [],
                  error: error
                }))
            )
          .catch(error => res.json({
            error: true,
            data: [],
            error: error
          }));
        }else{
          res.status(400).send("Cenário não cadastrado, já existe um cenário com este título!");
        }
      }
    )
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));
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
  })
  .catch(error => res.status(400).json({error:true, data:[], error: error}));
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
  })
  .catch(error => res.status(400).json({error:true, data:[], error: error}));
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
  })
  .catch(error => res.status(400).json({error:true, data:[], error: error}));
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
  })
  .catch(error => res.status(400).json({error:true, data:[], error: error}));
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
  })
  .catch(error => res.status(400).json({error:true, data:[], error: error}));
}

exports.updateCenarioRemovendoEpisodios = (req, res) =>{
  const idcenario = req.params.id;
  const{
    tituloCenario,
    descricaoContexto,
    nomeAtor,
    descricaoEpisodio,
    descricaoRecurso,
    descricaoExcecao
  } = req.body;
  model.Cenario.update({
    titulo: tituloCenario
  },{
    where: {
      id: idcenario
    }
  })
  .then(cenario => {
    var episodio = descricaoEpisodio.split('/');
    if(episodio.length == 'undefined'){
      model.Episodio.destroy({
        where: {cenarioId: idcenario}
      })
    }else if(episodio.length == 1){
      if(episodio == ""){
        model.Episodio.destroy({
          where: {cenarioId: idcenario}
        })
      }else{
        model.Episodio.findAll({
          where: {cenarioId: idcenario}
        })
        .then(episodios => {
          var qtd = episodios.length;
          for(let i=0;i<qtd;i++){
            var atributoEpisodio = episodio[i].split(',');
            if(i==0){
              model.Episodio.update({
                descricao: atributoEpisodio[0],
                tipo: atributoEpisodio[1]
                },{where: {id: episodios[i].id}
              })
            }else{
              model.Episodio.destroy({
                where: {id: episodios[i].id}
              })
            }
          }
        })
      }
    }else{
      model.Episodio.findAll({
        where: {cenarioId: idcenario}
      })
      .then(episodios => {
        var qtd = episodios.length;
        for(let i=0;i<qtd;i++){
          var atributoEpisodio = episodio[i].split(',');
          if(episodios[i] != 'undefined'){
            model.Episodio.update({
              descricao: atributoEpisodio[0],
              tipo: atributoEpisodio[1]
              },{where: {id: episodios[i].id}
            })
          }else{
            model.Episodio.destroy({
              where: {id: episodios[i].id}
            })
          }
        }})
    }
  })
  .then(cenario => model.Contexto.update({
    descricao: descricaoContexto
  },{
    where: {cenarioId: idcenario}
  }))
  .then(cenario => model.Ator.findAll({
    where: {cenarioId: idcenario}
  }).then(ators => { 
    var qtd = ators.length;
    var ator = nomeAtor.split(',');
    for(let i=0; i<qtd; i++){
      model.Ator.update({
        nome: ator[i]
      }, {where: {id: ators[i].id}})
    }

  }))
  .then(cenario => model.Recurso.findAll({
    where: {cenarioId: idcenario}
  }).then(recursos => {
    var qtd = recursos.length;
    var recurso = descricaoRecurso.split(',');
    for(let i=0; i<qtd; i++){
      model.Recurso.update({
        descricao: recurso[i]
      }, {where: {id: recursos[i].id}})
    }
  }))
  .then(cenario => model.Excecao.findAll({
    where: {cenarioId: idcenario}
  }).then(excecaos => {
    var qtd = excecaos.length;
    var excecao = descricaoExcecao.split(',');
    for(let i=0; i<qtd; i++){
      model.Excecao.update({
        descricao: excecao[i]
      }, {where: {id: excecaos[i].id}})
    }
  }))
  .then(cenario => setTimeout(function () {model.Cenario.findByPk(idcenario, { include: [{ all: true, nested: true }] })
    .then(response => res.status(200).json({
      error: false,
      data: response
    }))
    .catch(error => res.status(403).json({
      error: true,
      data: [],
      error: error
    }));
  }, 500))
}

exports.updateCenarioRemovendoRecursos = (req, res) =>{
  const idcenario = req.params.id;
  const{
    tituloCenario,
    descricaoContexto,
    nomeAtor,
    descricaoEpisodio,
    descricaoRecurso,
    descricaoExcecao
  } = req.body;
  model.Cenario.update({
    titulo: tituloCenario
  },{
    where: {
      id: idcenario
    }
  })
  .then(cenario => {
    model.Episodio.findAll({
      where: {cenarioId: idcenario}
    }).then(episodios => {
    var qtd = episodios.length;
    var episodio = descricaoEpisodio.split('/');
    for(let i=0; i<qtd; i++){
      var atributoEpisodio = episodio[i].split(',');
      model.Episodio.update({
        descricao: atributoEpisodio[0],
        tipo: atributoEpisodio[1]
      }, {where: {id: episodios[i].id}})
    }
  })
  })
  .then(cenario => model.Contexto.update({
    descricao: descricaoContexto
  },{
    where: {cenarioId: idcenario}
  }))
  .then(cenario => model.Ator.findAll({
    where: {cenarioId: idcenario}
  }).then(ators => { 
    var qtd = ators.length;
    var ator = nomeAtor.split(',');
    for(let i=0; i<qtd; i++){
      model.Ator.update({
        nome: ator[i]
      }, {where: {id: ators[i].id}})
    }

  }))
  .then(cenario => {
    var recurso = descricaoRecurso.split(',');
    if(recurso.length == 'undefined'){
       model.Recurso.destroy({
        where: {cenarioId: idcenario}
      })
    }else if(recurso.length == 1){
      if(recurso == ""){
        model.Recurso.destroy({
          where: {cenarioId: idcenario}
        })
      }else{
        model.Recurso.findAll({
          where: {cenarioId: idcenario}
        })
        .then(recursos => {
          var qtd = recursos.length;
          for(let i=0;i<qtd;i++){
            if(i==0){
              model.Recurso.update({
                descricao: recurso[i]
                },{where: {id: recursos[i].id}
              })
            }else{
              model.Recurso.destroy({
                where: {id: recursos[i].id}
              })
            }
          }
        })
      }
    }else{
      model.Recurso.findAll({
        where: {cenarioId: idcenario}
      })
      .then(recursos => {
        var qtd = recursos.length;
        for(let i=0;i<qtd;i++){
          if(recursos[i] != 'undefined'){
            if(recurso[i]){
              model.Recurso.update({
              descricao: recurso[i]
              },{where: {id: recursos[i].id}
            })
            }else{
              model.Recurso.destroy({
                where: {id: recursos[i].id}
              })
            }
          }else{
            model.Recurso.destroy({
              where: {id: recursos[i].id}
            })
          }
        }})
    }
  })
  .then(cenario => model.Excecao.findAll({
    where: {cenarioId: idcenario}
  }).then(excecaos => {
    var qtd = excecaos.length;
    var excecao = descricaoExcecao.split(',');
    for(let i=0; i<qtd; i++){
      model.Excecao.update({
        descricao: excecao[i]
      }, {where: {id: excecaos[i].id}})
    }
  }))
  .then(cenario => setTimeout(function () {model.Cenario.findByPk(idcenario, { include: [{ all: true, nested: true }] })
    .then(response => res.status(200).json({
      error: false,
      data: response
    }))
    .catch(error => res.status(403).json({
      error: true,
      data: [],
      error: error
    }));
  }, 500))
}

exports.updateCenarioRemovendoAtores = (req, res) =>{
  const idcenario = req.params.id;
  const{
    tituloCenario,
    descricaoContexto,
    nomeAtor,
    descricaoEpisodio,
    descricaoRecurso,
    descricaoExcecao
  } = req.body;
  model.Cenario.update({
    titulo: tituloCenario
  },{
    where: {
      id: idcenario
    }
  })
  .then(cenario => {
    model.Episodio.findAll({
      where: {cenarioId: idcenario}
    }).then(episodios => {
    var qtd = episodios.length;
    var episodio = descricaoEpisodio.split('/');
    for(let i=0; i<qtd; i++){
      var atributoEpisodio = episodio[i].split(',');
      model.Episodio.update({
        descricao: atributoEpisodio[0],
        tipo: atributoEpisodio[1]
      }, {where: {id: episodios[i].id}})
    }
  })
  })
  .then(cenario => model.Contexto.update({
    descricao: descricaoContexto
  },{
    where: {cenarioId: idcenario}
  }))
  .then(cenario => {
    var ator = nomeAtor.split(',');
    if(ator.length == 'undefined'){
       model.Ator.destroy({
        where: {cenarioId: idcenario}
      })
    }else if(ator.length == 1){
      if(ator == ""){
        model.Ator.destroy({
          where: {cenarioId: idcenario}
        })
      }else{
        model.Ator.findAll({
          where: {cenarioId: idcenario}
        })
        .then(ators => {
          var qtd = ators.length;
          for(let i=0;i<qtd;i++){
            if(i==0){
              model.Ator.update({
                nome: ator[i]
                },{where: {id: ators[i].id}
              })
            }else{
              model.Ator.destroy({
                where: {id: ators[i].id}
              })
            }
          }
        })   
      }
    }else{
      model.Ator.findAll({
        where: {cenarioId: idcenario}
      })
      .then(ators => {
        var qtd = ators.length;
        for(let i=0;i<qtd;i++){
          if(ators[i] != 'undefined'){
            if(ator[i]){
              model.Ator.update({
              nome: ator[i]
              },{where: {id: ators[i].id}
            })
            }else{
              model.Ator.destroy({
                where: {id: ators[i].id}
              })
            }
          }else{
            model.Ator.destroy({
              where: {id: ators[i].id}
            })
          }
        }})
    }
  })
  .then(cenario => model.Recurso.findAll({
    where: {cenarioId: idcenario}
  }).then(recursos => {
    var qtd = recursos.length;
    var recurso = descricaoRecurso.split(',');
    for(let i=0; i<qtd; i++){
      model.Recurso.update({
        descricao: recurso[i]
      }, {where: {id: recursos[i].id}})
    }
  }))
  .then(cenario => model.Excecao.findAll({
    where: {cenarioId: idcenario}
  }).then(excecaos => {
    var qtd = excecaos.length;
    var excecao = descricaoExcecao.split(',');
    for(let i=0; i<qtd; i++){
      model.Excecao.update({
        descricao: excecao[i]
      }, {where: {id: excecaos[i].id}})
    }
  }))
  .then(cenario => setTimeout(function () {model.Cenario.findByPk(idcenario, { include: [{ all: true, nested: true }] })
    .then(response => res.status(200).json({
      error: false,
      data: response
    }))
    .catch(error => res.status(403).json({
      error: true,
      data: [],
      error: error
    }));
  }, 500))
}
/* function criarExcecao(){
                  var excecao = descricaoExcecao.split(',');
                  var qtdExcecao = excecao.length;
                  for(let i=0; i<qtdExcecao;i++){
                    model.Excecao.create({
                      descricao: excecao[i],
                      cenarioId: cenario.id
                    })
                  }}
*/


          /*model.Cenario.create({
            titulo: tituloCenario
          })
          .then(cenario => model.Contexto.create({
            descricao: descricaoContexto,
            cenarioId: cenario.id
            })
            .then(
              function criarAtor(){
                var ator = nomeAtor.split(',');
                var qtdAtor = ator.length;
                for(let i=0; i<qtdAtor;i++){
                  model.Ator.create({
                    nome: ator[i],
                    cenarioId: cenario.id
                  })
                  .then(ator => res.json({
                    error: false,
                    data: cenario
                  }))
                  .catch(error => 
                    model.Cenario.destroy({
                    where: {id: cenario.id}
                    })
                    .then(() => {
                      res.status(400).send("Cenário não cadastrado, erro ao tentar cadastrar ator do cenário! \n"+
                      {error:true,data:[],error:error});
                    })
                  );
                }
              }
            )
            .then(
              function criarRecurso(){
                var recurso = descricaoRecurso.split(',');
                var qtdRecurso = recurso.length;
                for(let i=0; i<qtdRecurso;i++){
                  model.Recurso.create({
                    descricao: recurso[i],
                    cenarioId: cenario.id
                  })
                  .then(recurso => res.json({
                    error: false,
                    data: cenario
                  }))
                  .catch(error => erro = {error: error},
                    function excluirCenario(cenarios){
                      model.Cenario.destroy({
                        where: { id: cenario.id }
                      })
                      .then(() => {
                        res.status(400).send("Cenário não cadastrado, erro ao tentar cadastrar recurso do cenário!"+"\n"+erro.error);
                      }); 
                    }
                  );
                }
              }
            )
            .then(
              function criarExcecao(){
                var excecao = descricaoExcecao.split(',');
                var qtdExcecao = excecao.length;
                for(let i=0; i<qtdExcecao;i++){
                  model.Excecao.create({
                    descricao: excecao[i],
                    cenarioId: cenario.id
                  })
                  .then(excecao => res.json({
                    error: false,
                    data: cenario
                  }))
                  .catch(error => erro = {error: error},
                    function excluirCenario(cenario){
                      model.Cenario.destroy({
                        where: { id: cenario.id }
                      })
                      .then(() => {
                        res.status(400).send("Cenário não cadastrado, erro ao tentar cadastrar exceção do cenário!"+"\n"+erro.error);
                      }); 
                    }
                  );
                }
              }
            )
            .then(
              function criarEpisodio(){
                var episodio = descricaoEpisodio.split('/');
                var qtdEpisodio = episodio.length;
                for(let i=0; i<qtdEpisodio;i++){
                  var atributoEpisodio = episodio[i].split(',');
                  model.Episodio.create({
                    descricao: atributoEpisodio[0],
                    tipo: atributoEpisodio[1],
                    cenarioId: cenario.id
                  })
                  .then(episodio => res.json({
                    error: false,
                    data: cenario
                  }))
                  .catch(error => erro = {error: error},
                    function excluirCenario(cenario){
                      model.Cenario.destroy({
                        where: { id: cenario.id }
                      })
                      .then(() => {
                        res.status(400).send("Cenário não cadastrado, erro ao tentar cadastrar episódio do cenário!"+"\n"+erro.error);
                      }); 
                    }
                  );
                }
              }
            )
            .catch(
              function excluirCenario(cenarios){
                model.Cenario.destroy({
                  where: { id: cenario.id }
                })
                .then(() => {
                  res.status(400).send("Cenário não cadastrado, erro ao tentar cadastrar o contexto do cenário!");
                }); 
              }
            )
          )
          .catch(error => res.json({
            error: true,
            data: [],
            error: error
          }));
        }else{
          res.status(400).send("Cenário não cadastrado, já existe um cenário com este título!");
        }
      }
    )
    .catch(error => res.json({
      error: true,
      data: [],
      error: error
    }));*/


