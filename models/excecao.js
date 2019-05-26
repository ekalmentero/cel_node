'use strict';
module.exports = (sequelize, DataTypes) => {
  const Excecao = sequelize.define('Excecao', {
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Nome não pode ser vazio!"
        }
      }
    },
    Descricao: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Descricao não pode ser vazio!"
        }
      }
    },
    Tratamento: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Tratamento não pode ser vazio!"
        }
      }
    }
  }, {});
  Excecao.associate = function(models) {
    // associations can be defined here
  };
  return Excecao;
};