'use strict';
// nambah constraint ke kolom UserId di table Recipes

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Recipes', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'fkey_UserId',
      references: { //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Recipes', 'fkey_UserId')
  }
};
