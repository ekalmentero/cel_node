'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recurso = sequelize.define('Recurso', {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Descrição não pode ser vazio!"
        },
        is: {
          args: ["^[a-záàâãéêíóôõúç,.;:!? ]+$",'i'],
          msg:"Campo Descrição só permite letras, pontuação e espaços!"
        }
      }
    },
    cenarioId: DataTypes.INTEGER
  }, {});
  Recurso.associate = function(models) {
    // associations can be defined here
    Recurso.belongsTo(models.Cenario, {foreignKey: 'cenarioId', as: 'cenario'});
  };
  return Recurso;
};