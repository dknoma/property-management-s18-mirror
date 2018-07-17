'use strict';
module.exports = (sequelize, DataTypes) => {
  var PropertyTenant = sequelize.define('PropertyTenant', {
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