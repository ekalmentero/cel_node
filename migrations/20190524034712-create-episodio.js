'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Episodios', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Titulo: {
        type: Sequelize.STRING
      },
      Tipo: {
        type: Sequelize.ENUM('Condicional', 'Opcional', 'Sequencial', 'Não Sequencial')
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
    .then(() => queryInterface.addConstraint('episodios',['cenarioId'],{
      type: 'foreign key',
      name: 'FK_episodios_cenario',
      references: { //Required field
        table: 'cenarios',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Episodios');
    return queryInterface.remove('FK_episodios_cenario');
  }
};