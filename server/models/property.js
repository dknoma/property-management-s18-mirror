'use strict';
module.exports = (sequelize, DataTypes) => {
  const Property = sequelize.define('Property', {
    property_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    property_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number_of_bedrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    number_of_bathrooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    allows_pets: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    prices: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    url_address: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
  };
  return Property;
};
