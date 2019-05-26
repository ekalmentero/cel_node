'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ator = sequelize.define('Ator', {
    Nome:  {
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
    Sobrenome:  {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg:"Campo Sobrenome não pode ser vazio!"
        },
        is: {
          args: ["^[a-z]+$",'i'],
          msg:"Campo Sobrenome só permite letras!"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg:"Informe um email corretamente!"
        },
        notEmpty: {
          msg:"Campo email não pode ser vazio!"
        },
        isUnique: function (value, next) {
            var self = this;
            Ator.count({where: {email: value}})
                .then(function (ator) {
                    // reject if a different ator wants to use the same email
                    if (ator != 0) {
                        return next('Email já em uso!');
                    }
                    return next();
                })
                .catch(function (err) {
                    return next(err);
                });
        }
      }
    }
  }, {});
  Ator.associate = function(models) {
    // associations can be defined here
    Ator.belongsToMany(models.Cenario, {through: 'Cenario_Ator'});
  };
  return Ator;
};