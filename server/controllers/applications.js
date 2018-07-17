const Property = require('../models').Property;
const User = require('../models').User;
const PropertyTenant = require('../models').PropertyTenant;
const Application = require('../models').Application;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	create(req, res) {
		return Application
		.create({
			tenantId: req.body.tenantId,
			propertyId: req.body.propertyId,
			pmId: req.body.pmId,
			form_subject: req.body.subject,
			form_body: req.body.body,
			})
			.then((application, created) => {
				//if relation exists, need to try again
				if(!created) {
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
	},
	findApplications(req, res) {
		//verify if PM
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
};