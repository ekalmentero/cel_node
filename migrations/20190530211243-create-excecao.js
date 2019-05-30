'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Excecaos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      descricao: {
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
    .then(() => queryInterface.addConstraint('excecaos',['cenarioId'],{
      type: 'foreign key',
      name: 'FK_excecaos_cenario',
      references: { //Required field
        table: 'cenarios',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Excecaos');
    return queryInterface.remove('FK_excecaos_cenario');
  }
};