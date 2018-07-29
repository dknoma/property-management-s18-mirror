'use strict';
module.exports = (sequelize, DataTypes) => {
  const Maintenance = sequelize.define('Maintenance', {
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
    }
  }, {});
  Maintenance.associate = (models) => {
    Maintenance.belongsTo(models.User, {
      foreignKey: 'tenantId',
      onDelete: 'CASCADE',
    }),
    Maintenance.belongsTo(models.Property, {
      foreignKey: 'propertyId',
      onDelete: 'CASCADE',
    }),
    Maintenance.belongsTo(models.User, {
      foreignKey: 'pmId',
      onDelete: 'CASCADE',
    });
  };
  return Maintenance;
};
