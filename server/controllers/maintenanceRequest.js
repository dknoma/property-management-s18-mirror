const Property = require('../models').Property;
const PropertyTenant = require('../models').PropertyTenant;
const Maintenance = require('../models').Maintenance;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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
                form_subject: req.body.form_subject.trim(),
                form_body: req.body.form_body.trim(),
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
				})
			})
			.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
		
	}
}