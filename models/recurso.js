'use strict';
module.exports = (sequelize, DataTypes) => {
  const Recurso = sequelize.define('Recurso', {
    Nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Nome não pode ser vazio!"
        }
      }
    },
    Descricao: DataTypes.STRING,
    alocado:  {
		type: DataTypes.BOOLEAN,
		allowNull: false,
	  	validate: {
	        notEmpty: {
	          msg:"Campo alocado não pode ser vazio!"
	        }
	  	}
    },
    expira_alocacao: DataTypes.DATEONLY
  }, {});
  Recurso.associate = function(models) {
    // associations can be defined here
  };
  return Recurso;
};