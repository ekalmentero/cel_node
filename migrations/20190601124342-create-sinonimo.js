'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Sinonimos',{
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      simboloId: {
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
   .then(() => queryInterface.addConstraint('Sinonimos', ['simboloId'], {
      type: 'foreign key',
      name: 'fk_sinonimo_simbolo',
      references: { //Required field
        table: 'Simbolos',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Sinonimos');
    return queryInterface.remove('FK_sinonimo');

  }
};
