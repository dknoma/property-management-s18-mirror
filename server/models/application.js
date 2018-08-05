'use strict';
module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define('Application', {
    tenantId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tenant_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    property_name: {
      type: DataTypes.STRING,
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
    rent:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    approval_status: {
      type: DataTypes.BOOLEAN,
      defaultValue: null
    }
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
