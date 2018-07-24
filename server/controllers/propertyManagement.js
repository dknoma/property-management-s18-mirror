const Property = require('../models').Property;
const User = require('../models').User;
const PropertyTenant = require('../models').PropertyTenant;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  addToProp(req, res) {
    //authorize if user owns the property before updating
    return PropertyTenant
      .findOrCreate({
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
        return res.status(200).send(propertyTenants)
      })
      .catch(error => res.status(400).send(error));
  },
  removeTenant(req, res) {
    //authorize if user owns the property before updating
    return PropertyTenant
      .find({
        where: {
          [Op.and]: [
            {propertyId: req.params.propertyId},
            {tenantId: req.params.tenantId}
          ]
        }
      })
      .then(propertyTenant => {
        if(!propertyTenant) {
          return res.status(404).send({
              message: 'Association not found',
          });
        }
        return propertyTenant
            .destroy()
            //status(204).send()) : 204 No Content
            .then(() => res.status(200).send({ message: 'User successfully removed from property!'}))
            .catch(error => res.status(400).send(error));
        })
        .catch(error => res.status(400).send(error));
  }
};