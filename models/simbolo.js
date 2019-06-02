'use strict';
module.exports = (sequelize, DataTypes) => {
  var Simbolo = sequelize.define('Simbolo', {
    nome: DataTypes.STRING,
    nocao: DataTypes.STRING,
    impacto: DataTypes.STRING,
    classificacao: DataTypes.STRING,
  });

  Simbolo.associate = function(models) {
  models.Simbolo.hasMany(models.Sinonimo);
  };

  return Simbolo;
};
