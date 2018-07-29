'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    pmId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    form_subject: {
      type: DataTypes.STRING,
      allowNull: false
    },
    form_body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reviewed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
  }, {});
  Application.associate = (models) => {
    Application.belongsTo(models.User, {
      foreignKey: 'tenantId',
      onDelete: 'CASCADE',
    }),
    Application.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      onDelete: 'CASCADE',
    }),
    Application.belongsTo(models.User, {
      foreignKey: 'pmId',
      onDelete: 'CASCADE',
    });
  };
  return Application;
};