'use strict';
module.exports = (sequelize, DataTypes) => {
  var PropertyTenant = sequelize.define('PropertyTenant', {
    tenant_username:{
      type: DataTypes.STRING,
      allowNull: false
    },
    rent:{
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    owe: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  }, {});
  PropertyTenant.associate = (models) => {
    PropertyTenant.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      onDelete: 'CASCADE',
    }),
    PropertyTenant.belongsTo(models.User, {
      foreignKey: 'tenantId',
      onDelete: 'CASCADE',
    });
  };
  return PropertyTenant;
};
