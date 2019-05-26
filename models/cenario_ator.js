'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cenario_Ator = sequelize.define('Cenario_Ator', {
    CenarioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Título não pode ser vazio!"
        }
      }
    },
    AtorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Título não pode ser vazio!"
        }
      }
    },
  },
  	{
    timestamps: false
	}
);
  Cenario_Ator.associate = function(models) {
    // associations can be defined here
  };
  return Cenario_Ator;
};