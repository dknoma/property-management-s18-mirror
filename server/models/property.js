'use strict';
module.exports = (sequelize, DataTypes) => {
  var Property = sequelize.define('Property', {
    property_id: DataTypes.STRING,
    property_name: DataTypes.STRING,
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    number_of_bedrooms: DataTypes.STRING,
    number_of_bathrooms: DataTypes.STRING,
    prices: DataTypes.STRING,
    url_address: DataTypes.STRING
  }, {});
  Property.associate = function(models) {
    // associations can be defined here
  };
  return Property;
};
