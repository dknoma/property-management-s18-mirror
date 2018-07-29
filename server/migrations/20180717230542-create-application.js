'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Applications', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tenantId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'tenantId',
        },
      },
      tenant_name: {
        type: Sequelize.String,
        allowNull: false,
      },
      propertyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Properties',
          key: 'id',
          as: 'propertyId',
        },
      },
      property_name: {
        type: Sequelize.String,
        allowNull: false,
      },
      pmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
          as: 'pmId',
        },
      },
      form_subject: {
        type: Sequelize.STRING,
        allowNull: false
      },
      form_body: {
        type: Sequelize.STRING,
        allowNull: false
      },
      approval_status: {
        type: Sequelize.BOOLEAN,
        defaultValue: null
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
  down: (queryInterface/*, Sequelize*/) => {
    return queryInterface.dropTable('Applications');
  }
};