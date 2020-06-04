'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Books', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING,
        allowNull : true,
      },
      category_id: {
        type: Sequelize.INTEGER,
        allowNull : true,
        onDelete: 'SET NULL',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      queryInterface.addConstraint('Books', ['category_id'], {
        type: 'foreign key',
        references: {
          name: 'Books_category_id_Categories_fk',
          table: 'Categories',
          field: 'id'
        },
      })
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Books');
  }
};