'use strict';
module.exports = (sequelize, DataTypes) => {
  var Simbolo = sequelize.define('Simbolo', {
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
    nocao: {
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
    impacto: {
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
    classificacao: {
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
    }
  })
  Simbolo.associate = function(models) {
  models.Simbolo.hasMany(models.Sinonimo);
  };

  return Simbolo;
};
