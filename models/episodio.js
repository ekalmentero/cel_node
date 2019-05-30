'use strict';
module.exports = (sequelize, DataTypes) => {
  const Episodio = sequelize.define('Episodio', {
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
    tipo: DataTypes.ENUM('Condicional', 'Opcional', 'Sequencial', 'Não Sequencial'),
    cenarioId: DataTypes.INTEGER
  }, {});
  Episodio.associate = function(models) {
    // associations can be defined here
    Episodio.belongsTo(models.Cenario, {foreignKey: 'cenarioId', as: 'cenario'});
  };
  return Episodio;
};