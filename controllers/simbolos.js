var models  = require('../models/index');
    exports.simbolo_create= function(req, res) {
      models.Simbolo.bulkCreate(simbolos = [{id:req.body.id,
        nome: req.body.nome,
        nocao: req.body.nocao,
        impacto: req.body.impacto,
        classificacao: req.body.classificacao}], {returning: true}).then(listaSimbolos => {
          res.json(listaSimbolos)
          console.log(simbolos)
          var sin = req.body.nomeSinonimo.split(',');
          var tamsin = sin.length;
          for(let i=0; i<tamsin;i++){
          models.Sinonimo.findOrCreate({
            where: {nome: sin[i],
             simboloId: req.body.id}}
            ).then(listaSinonimos => {
              res.json(listaSinonimos)
              console.log(simbolos)
            }).catch(function (err) {
              res.status(500);
            })
          }}).catch(function (err) {
            res.status(500);
          })
    }
exports.simbolo_get= function(req, res){
models.Simbolo.findAll({
  where: {
    id: req.params.simbolo_id}
  }).then(simbolo => {
  res.status(200);
  //res.json(simbolo.nome)
  models.Sinonimo.findAll({
    where: {
    simboloId: req.params.simbolo_id,
    }
  }).then(sinonimos => {
    res.status(200);
    //res.json(sinonimos.nome)
  }).catch(function (err) {
      res.status(500);
  });
}).catch(function (err) {
  res.status(500);
});
}
exports.simbolo_delete= function(req, res) {
  models.Simbolo.destroy({
    where: {
      id: req.params.simbolo_id,
    }
  }).then(function() {
    res.status(200);
  }).catch(function (err) {
    res.status(500);
  });
},
exports.simbolo_update = (req, res) => {
  models.Simbolo.update({ 
    nome: req.body.nome,
    nocao: req.body.nocao ,
    impacto: req.body.impacto,
    classificacao: req.body.classificacao
  },
    {
      where: {
        id: req.body.id
      }
    }).then(function() {
    res.status(200);
  }).catch(function (err) {
    res.status(500);
  });
};
exports.update_delete_sinonimo= function (req, res) {
  models.Sinonimo.destroy({
    where: {
      id: req.body.id,
      simboloId:req.params.simbolo_id
    }
  }).then(function() {
    res.status(200);
  }).catch(function (err) {
    res.status(500);
  });
};
exports.update_delete_todos_sinonimos= function (req, res) {
  models.Sinonimo.destroy({
    where: {
      simboloId:req.params.simbolo_id
    }
  }).then(function() {
    res.status(200);
  }).catch(function (err) {
    res.status(500)
  });
};