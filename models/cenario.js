'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cenario = sequelize.define('Cenario', {
    Titulo: {
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
    Cenario.hasMany(models.Episodio);
    Cenario.belongsToMany(models.Ator, {through: 'Cenario_Ator'});
  };
  return Cenario;
};