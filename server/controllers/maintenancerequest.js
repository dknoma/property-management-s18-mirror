const Property = require('../models').Property;
// const User = require('../models').User;
// const PropertyTenant = require('../models').PropertyTenant;
const Maintenance = require('../models').Maintenance;
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;

module.exports = {
	create(req, res) {
		return Property
		.findById(req.params.propertyId)
		.then(property => {
			return Maintenance
			.create({
				tenantId: req.body.tenantId,
				propertyId: req.params.propertyId,
				pmId: property.userId,
				form_subject: req.body.form_subject,
				form_body: req.body.form_body,
				})
				.then((maintenance, created) => {
					//if relation exists, need to try again
					if(maintenance == null) {
						//409: conflict with an existing resource; ie. duplicate username/emails
						return res.status(404).send({
							message: 'An error has occurred. Please try again.'
						});
					}
					return res.status(201).send({
							maintenance,
							message: 'Maintenance request was sent successfully!'
					});
				})
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
	},

	reviewMaintenanceRequest(req, res) {
		//verify if PM
		/* if user_type === propertymanager, move on, else 403 restricted */
		var currentUser = req.currentUser;
		if(currentUser) {
			console.log(currentUser);

			Property.findById(req.params.propertyId)
			.then(property => {
				if(property.userId == currentUser) {
					console.log("prop owner: " + property.userId);
					return MaintenanceRequest
						.findAll({
							where: {
								propertyId: req.params.propertyId,
							}
						})
						.then(maintenanceRequest => {
							return res.status(200).send(maintenanceRequest)
						})
						.catch(error => res.status(400).send(error));
				} else {
					return res.status(400).send({message: 'Unable to authenticate.'});
				}
			})
			.catch(error => res.status(400).send({message: 'Unable to authenticate.', error}));
		} else {
			return res.status(400).send({message: 'Unable to authenticate.'});
		}
	},

	delete(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			Property.findById(req.params.propertyId)
			.then(property => {
				if(property.userId = currentUser) {
					return Maintenance
						.findById(req.body.tenantId)
						.then(maintenance => {
							return maintenance
								.destroy()
								.then(() => res.status(200).send({ message: 'Maintenance request successfully removed!'}))
						})
				} else {
					return res.status(400).send({message: 'Unable to authenticate.'});
				}
			})
			.catch(error => res.status(400).send({message: 'Unable to find user', error}));
		} else {
			return res.status(400).send({message: 'Unable to authenticate.'});
		}
	}
}
