'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Simbolos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
  
      nome:  {
        unique : true,
        type: Sequelize.STRING
      },
      nocao: {
        type: Sequelize.STRING
      },
      impacto: {
        type: Sequelize.STRING
           },
      classificacao:{
        type: Sequelize.STRING
      },
        createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Simbolos');
  }
};
