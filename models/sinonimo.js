'use strict';
var Simbolo = require('../models/simbolo');

module.exports = (sequelize, DataTypes) => {
    var Sinonimo = sequelize.define('Sinonimo', {
    nome: DataTypes.STRING,
    simboloId:DataTypes.INTEGER
    });
    
    Simbolo.associate = function (models) {
      Sinonimo.belongsTo(models.Simbolo, {foreignKey: 'simboloId', as: 'Simbolo'});
  };
  return Sinonimo;
};