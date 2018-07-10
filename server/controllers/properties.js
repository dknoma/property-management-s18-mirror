const PropertyItem = require('../models').Property;
const config = require('./config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  create(req, res) {
    //verify if user is propertymanager,
    return PropertyItem
      .create({
				property_type: req.body.property_type,
		    property_name: req.body.property_name,
		    street: req.body.street,
		    city: req.body.city,
		    state: req.body.state,
		    zip: req.body.zip,
		    number_of_bedrooms: req.body.number_of_bedrooms,
        number_of_bathrooms: req.body.number_of_bathrooms,
        allows_pets: req.body.allows_pets,
		    prices: req.body.prices,
		    url_address: req.body.url_address,
      })
      .then(propertyItem => res.status(201).send(propertyItem))
      .catch(error => res.status(400).send(error));
  },

  filter(req, res) {
    return PropertyItem
    .findAll({
      where: {
        [Op.or]: [
          {allows_pets: req.body.allows_pets},
          {zip: req.body.zip},
          {state: req.body.state},
          {city: req.body.city},
          {number_of_bedrooms: req.body.number_of_bedrooms},
          {number_of_bathrooms: req.body.number_of_bathrooms},
          {prices: { [Op.gt]: req.body.prices } }
        ]
      }
    })
    .then(property_item => {
    if (!property_item) {
      return res.status(404).send({
        message: 'property Not Found',
      });
    }
    return res.status(200).send(property_item);
    })
    .catch(error => res.status(400).send(error));
  },


  list(req, res) {
    return PropertyItem
      .all()
      .then(propertyItem => res.status(200).send(propertyItem))
      .catch(error => res.status(400).send(error));
  },

  retrieve(req, res) {
    return PropertyItem
      .findById(req.params.propertyId)
      .then(property_item => {
        if (!property_item) {
          return res.status(404).send({
            message: 'property Not Found',
          });
        }
        return res.status(200).send(property_item);
      })
      .catch(error => res.status(400).send(error));
    }
  };
