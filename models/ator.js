'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ator = sequelize.define('Ator', {
    nome:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Nome não pode ser vazio!"
        },
        is: {
          args: ["^[a-z]+$",'i'],
          msg:"Campo Nome só permite letras!"
        }
      }
    },
    cenarioId: DataTypes.INTEGER
  }, {});
  Ator.associate = function(models) {
    // associations can be defined here
    Ator.belongsTo(models.Cenario, {foreignKey: 'cenarioId', as: 'cenario'});
  };
  return Ator;
};