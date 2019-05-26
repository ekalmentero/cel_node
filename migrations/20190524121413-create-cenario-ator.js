'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Cenario_Ators', {
      CenarioId: {
        type: Sequelize.INTEGER
      },
      AtorId: {
        type: Sequelize.INTEGER
      }
    })
    .then(() => {
        return queryInterface.addConstraint('Cenario_Ators', ['CenarioId', 'AtorId'], {
          type: 'primary key',
          name: 'CenarioAtors_pkey'
        });
      })
    .then(() => queryInterface.addConstraint('Cenario_Ators',['CenarioId'],{
      type: 'foreign key',
      name: 'FK_CenarioAtors_cenario',
      references: { //Required field
        table: 'cenarios',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }))
    .then(() => queryInterface.addConstraint('Cenario_Ators',['AtorId'],{
      type: 'foreign key',
      name: 'FK_CenarioAtors_ator',
      references: { //Required field
        table: 'ators',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    }));
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Cenario_Ators');
    return queryInterface.remove('FK_CenarioAtors_cenario');
    return queryInterface.remove('FK_CenarioAtors_ator');
    return queryInterface.remove('CenarioAtors_pkey');
  }
};