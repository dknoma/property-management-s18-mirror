const Property = require('../models').Property;
const User = require('../models').User;
const PropertyTenant = require('../models').PropertyTenant;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  addToProp(req, res) {
    //authorize if user owns the property before updating
    var currentUser = req.currentUser;
    Property.findById(req.body.propertyId)
    .then(property => {
      if(property.userId == currentUser) {
        User.findById(req.body.tenantId)
          .then(user => {
            return PropertyTenant
              .findOrCreate({
                where: {
                  propertyId: req.body.propertyId,
                  tenantId: req.body.tenantId,
                  rent: req.body.rent,
                  owe: req.body.owe,
                  credits: req.body.credits
                },
                defaults: {
                  propertyId: req.body.propertyId,
                  tenantId: req.body.tenantId,
                  tenant_username: user.username,
                  rent: req.body.rent,
                  owe: 0,
                  credits: 0,
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
                    rent: propertyTenant.rent,
                    owe: propertyTenant.owe,
                    credits: propertyTenant.credits,
                    tenant_username: propertyTenant.tenant_username,
                  },
                  message: 'User was added successfully!'
                });
              })
              .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
        } else {
          return res.status(400).send({message: 'Unable to authenticate.'});
        }
    })
    .catch(error => res.status(400).send(error));
  },

  updateRent(req, res){
    var currentUser = req.currentUser;
    Property.findById(req.body.propertyId)
    .then(property => {
      if(property.userId == currentUser) {
        User.findById(req.body.tenantId)
          .then(user => {
            return PropertyTenant
            .update({
  						rent: req.body.rent || propertyTenant.rent,
  					})
                return res.status(201).send({
                  propertyTenant: {
                    propertyId: propertyTenant.propertyId,
                    tenantId: propertyTenant.tenantId,
                    rent: propertyTenant.rent,
                    owe: propertyTenant.owe,
                    credits: propertyTenant.credits,
                    tenant_username: propertyTenant.tenant_username,
                  },
                  message: 'The rent was updated successfully!'
                });
          })
          .catch(error => res.status(400).send(error));
        } else {
          return res.status(400).send({message: 'Unable to authenticate.'});
        }
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
    var currentUser = req.currentUser;
    Property.findById(req.params.propertyId)
      .then(property => {
        if(property.userId == currentUser) {
          return PropertyTenant
            .find({
              where: {
                [Op.and]: [
                  {propertyId: req.params.propertyId},
                  {tenantId: req.body.tenantId}
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
                  .then(() => res.status(200).send({ message: 'User successfully removed from property!'}))
                  // .catch(error => res.status(400).send({message: 'Unable to find user', error}));
              })
              // .catch(error => res.status(400).send({message: 'Unable to find user', error}));
        } else {
          return res.status(400).send({message: 'Unable to authenticate.'});
        }
      })
      .catch(error => res.status(400).send({message: 'Unable to find user', error}));
  },
//test purposes
  list(req, res) {
    return PropertyTenant
      .findAll()
      .then(propertyTenant => res.status(200).send(propertyTenant))
    }
};
