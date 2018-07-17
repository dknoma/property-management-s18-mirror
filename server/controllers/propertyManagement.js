const Property = require('../models').Property;
const User = require('../models').User;
const PropertyTenant = require('../models').PropertyTenant;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  addToProp(req, res) {
    return PropertyTenant
      .findOrCreate({
        //tries to find a User with username and/or email and returns false if that User exists
        where: {
            propertyId: req.body.propertyId,
            tenantId: req.body.userId,
        },
        defaults: {
          propertyId: req.body.propertyId,
          tenantId: req.body.userId,
        }
      })
      .spread((propertyTenant, created) => {
        //if relation exists, need to try again
        if(!created) {
          //409: conflict with an existing resource; ie. duplicate username/emails
          return res.status(409).send({
            message: 'User is already on the property. Please try again.'
          });
        }
      
        return res.status(201).send({
          propertyTenant: {
            propertyId: propertyTenant.propertyId,
            tenantId: propertyTenant.tenantId,
          },
          message: 'User was added successfully!'
        });
      })
      .catch(error => res.status(400).send(error));
  },
  findTenants(req, res) {
    return PropertyTenant
      .findAll({
        where: {
          propertyId: req.params.propertyId,
        }
      })
      .then(propertyTenants => {
        res.status(200).send(propertyTenants)
      })
      .catch(error => res.status(400).send(error));
  }
};