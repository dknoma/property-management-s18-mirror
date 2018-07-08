'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Properties', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      property_type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      property_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      zip: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      number_of_bedrooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      number_of_bathrooms: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      allows_pets: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      prices: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url_address: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Properties');
  }
};