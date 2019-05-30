'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ators', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      cenarioId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
    .then(() => queryInterface.addConstraint('ators',['cenarioId'],{
      type: 'foreign key',
      name: 'FK_ators_cenario',
      references: { //Required field
        table: 'cenarios',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ators');
    return queryInterface.remove('FK_ators_cenario');
  }
};