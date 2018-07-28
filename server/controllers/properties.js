const Property = require('../models').Property;
const User = require('../models').User;
const config = require('./config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	create(req, res) {
		//verify if user is propertymanager
		return Property
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
				userId: req.body.userId
			})
			.then(property => res.status(201).send(property))
			.catch(error => res.status(400).send(error));
	},

	filter(req, res) {
		return Property
		.findAll({
			where: {
				[Op.and]: [
					{
						property_type: req.body.property_type != null ? 
							req.body.property_type : {[Op.iLike]: '%'}
					},
					{
						city: req.body.city != null ? {
							[Op.iLike]: '%' + req.body.city + '%'
						} : {[Op.iLike]: '%'}
					},
					{
						state: req.body.state != null ? {
							[Op.iLike]: '%' + req.body.state + '%'
						} : {[Op.iLike]: '%'}
					},
					{
						zip: req.body.zip != null ? {
							[Op.iLike]: '%' + req.body.zip + '%'
						} : {[Op.iLike]: '%'}
					},
					{
						number_of_bedrooms: req.body.number_of_bedrooms != null ? 
							req.body.number_of_bedrooms : {[Op.gte]: 1}
					},
					{
						number_of_bathrooms: req.body.number_of_bathrooms != null ?
							req.body.number_of_bathrooms : {[Op.gte]: 1}
					},
					{
						allows_pets: req.body.allows_pets != null ?
							req.body.allows_pets : {[Op.any]: [true, false]}
					},
					{
						prices:  req.body.price_gte === '>' ? 
							{[Op.gte]: req.body.prices} :
							req.body.price_gte === '<' ? 
								{[Op.lte]: req.body.prices} :
								{[Op.gte]: 0}
					}
				]
			}
		})
		.then(property => {
			if (property.length == 0) {
				return res.status(404).send({
					message: 'property Not Found',
				});
			}
			return res.status(200).send(property);
		})
		.catch(error => res.status(400).send(error));

	},

	list(req, res) {
		return Property
			.findAll()
			.then(property => res.status(200).send(property))
			.catch(error => res.status(400).send(error));
	},

	retrieve(req, res) {
		return Property
			.findById(req.params.propertyId)
			.then(property => {
				if (!property) {
					return res.status(404).send({
						message: 'property Not Found',
					});
				}
				return res.status(200).send(property);
			})
			.catch(error => res.status(400).send(error));
	}
};
