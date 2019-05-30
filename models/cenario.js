'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cenario = sequelize.define('Cenario', {
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Título não pode ser vazio!"
        },
        is: {
          args: ["^[a-záàâãéêíóôõúç ]+$",'i'],
          msg:"Campo Título só permite letras, pontuação e espaços!"
        }
      }
    }
  }, {});
  Cenario.associate = function(models) {
    // associations can be defined here
    Cenario.hasOne(models.Contexto);
    Cenario.hasMany(models.Ator);
    Cenario.hasMany(models.Episodio);
    Cenario.hasMany(models.Recurso);
    Cenario.hasMany(models.Excecao);
  };
  return Cenario;
};