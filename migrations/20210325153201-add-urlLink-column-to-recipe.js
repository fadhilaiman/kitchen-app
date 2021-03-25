'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
    return queryInterface.addColumn('Recipes', 'urlLink', Sequelize.STRING)
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.removeColumn('Recipes', 'urlLink', {})
  }
};
