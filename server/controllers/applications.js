const Property = require('../models').Property;
const User = require('../models').User;
const PropertyTenant = require('../models').PropertyTenant;
const Application = require('../models').Application;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	create(req, res) {
		return Property
		.findById(req.params.propertyId)
		.then(property => {
			return Application
			.create({
				tenantId: req.body.tenantId,
				propertyId: req.params.propertyId,
				pmId: property.userId,
				form_subject: req.body.form_subject,
				form_body: req.body.form_body,
				})
				.then((application, created) => {
					//if relation exists, need to try again
					if(application == null) {
						//409: conflict with an existing resource; ie. duplicate username/emails
						return res.status(404).send({
							message: 'An error has occurred. Please try again.'
						});
					}
					
					return res.status(201).send({
							application,
							message: 'Application was sent successfully!'
					});
				})
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
		
	},
	reviewApplications(req, res) {
		//verify if PM
		/* if user_type === propertymanager, move on, else 403 restricted */
		return Application
			.findAll({
				where: {
					propertyId: req.params.propertyId,
				}
			})
			.then(applications => {
				return res.status(200).send(applications)
			})
			.catch(error => res.status(400).send(error));
	},
	delete(req, res) {
		return Application
			.findById({
				where: {

				}
			})
	}
};