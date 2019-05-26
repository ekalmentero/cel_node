'use strict';
module.exports = (sequelize, DataTypes) => {
  const Contexto = sequelize.define('Contexto', {
    Titulo:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Título não pode ser vazio!"
        },
        is: {
          args: ["^[a-záàâãéêíóôõúç,.;:!? ]+$",'i'],
          msg:"Campo Título só permite letras, pontuação e espaços!"
        }
      }
    },
    Descricao:  {
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
  Contexto.associate = function(models) {
    // associations can be defined here
    Contexto.belongsTo(models.Cenario, {foreignKey: 'cenarioId', as: 'cenario'});
  };
  return Contexto;
};