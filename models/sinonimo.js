'use strict';
var Simbolo = require('../models/simbolo');
module.exports = (sequelize, DataTypes) => {
    var Sinonimo = sequelize.define('Sinonimo', {
    nome: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg:"Campo Nome não pode estar vazio!"
        },
        is: {
          args: ["^[a-z]+$",'i'],
          msg:"Atenção! Use somente caracteres permitidos."
        },
        len: {
          args: [3,15],
          msg:"Tamanho fora do especificado!"
        }
      }
    },
    simboloId: {
      type: DataTypes.INTEGER,
      references: 'Simbolo',
      referencesKey: 'simboloId'
  }
    });    
    Sinonimo.associate = function (models) {
      models.Sinonimo.belongsTo(models.Simbolo, {
        onDelete: "CASCADE",
        foreignKey:{
          allowNull: false
        }
      });
  };
  
  return Sinonimo;
};