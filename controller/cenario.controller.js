var model = require('../models/index');

exports.viewAll = (req, res) => {
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
};