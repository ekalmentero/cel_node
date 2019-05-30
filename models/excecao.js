'use strict';
module.exports = (sequelize, DataTypes) => {
  const Excecao = sequelize.define('Excecao', {
    descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo descrição não pode ser vazio!"
        },
        is: {
          args: ["^[a-záàâãéêíóôõúç,.;:!? ]+$",'i'],
          msg:"Campo descrição só permite letras, pontuação e espaços!"
        }
      }
    },
    cenarioId: DataTypes.INTEGER
  }, {});
  Excecao.associate = function(models) {
    // associations can be defined here
    Excecao.belongsTo(models.Cenario, {foreignKey: 'cenarioId', as: 'cenario'});
  };
  return Excecao;
};