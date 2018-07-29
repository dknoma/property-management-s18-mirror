var User = require('../models').User;
var Card = require('../models').Card;
var stripe = require('stripe')('sk_test_0PHtbfBiBeysTSgQiECHmy18');
var TenantPayment = require('../models').TenantPayment;
const config = require('./config');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	create(req, res) {
		const charge = await stripe.charges.create({
			amount: req.body.amount,
			currency: 'usd',
			description: 'Pay' ,
			source: req.body.id
		});
		var userId = req.userId;
		req.user.credits += (req.body.amount/100);
		req.user.owe -= (req.body.amount/100);
		const user = await req.user.save();

		return TenantPayment
		TenantPayment.findOne({
				where: {tenantId: userId}
			})
			.then(tenantPayment => {
				if(!tenantPayment) {
					return res.status(404).send({
						message: 'tenant Payment Not Found',
					});
				}
				return tenantPayment
					.update({
						tenantId: userId,
						isPaid: true,
					})
					.then(() => res.status(200).send({
						tenantPayment: {
							pmId: tenantPayment.pmId,
							tenantId: tenantPayment.tenantId,
							property_name: tenantPayment.property_name,
							isPaid: tenantPayment.isPaid,
							description: tenantPayment.description,
							amount: tenantPayment.amount
						}
					}))
					//409: conflict with an existing resource; ie. duplicate username/emails
					.catch((error) => res.status(409).send(error));
			})


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

// exports.newStripeUser = function(req, res){
//
// 	var stripeToken = req.body.stripeToken;
// 	var lastFour = req.body.lastFour;
// 	var username;
//
// 	User.findById(req.params.userId, function (err, user){
// 		username = user.username;
// 	});
//
// 	var customerIdHolder;
//
// 	/* creates the new tenant's Stripe account, without a source credit card */
// 	stripe.customers.create({
// 		description: username
// 	}).then(function (customer){
//
// 		customerIdHolder = customer.id;
//
// 		User
// 		.findById(req.params.userId, function (err, user){
//
// 			if (err){
// 				res.send(err);
// 			} else {
//
// 				/*console.log(user);
// 				console.log(customerIdHolder);*/
//
// 				user.stripeCustomerID = customerIdHolder;
// 				user.hasStripeProfile = true;
//
// 				user.save(function (err){
// 					if (err){
// 						res.send(err);
// 					}
// 				});
// 			}
//
// 		});
//
// 			/* add tenant's source credit card  to the Stripe account created, then return the card ID  */
//
// 		stripe.customers.createSource(customerIdHolder, {source: stripeToken}, function (err, card){
//
//   			var credCard = new Card({
//   				lastFour: req.body.lastFour,
//   				cardID: card.cardId
//   			});
//
//   			User.findById(req.params.userId, function (err, user){
//   				user.cards.push(credCard);
//   				user.save(function (err){
//   					if (err){
//   						res.json({message: "Failed saving user"});
//   					}
//   				});
//   			});
//     		res.json({"card": credCard});
//
//  		});
//
// 	});
//
// };
//
// exports.newStripeCard = function (req, res){
//
// 	var stripeCustomerID;
// 	var stripeToken = req.body.stripeToken;
//
// 					User.findById(req.params.userId, function (err, user){
// 						if (err){
// 							res.send(err);
// 						} else {
//
// 							stripeCustomerID = user.stripeCustomerID;
//
// 							console.log("charge w/o email");
// 							var charge = stripe.charges.create({
// 					  				amount: chargeAmount,
// 					  				currency: "usd",
// 					  				source: stripeToken,
// 					  				description: chargeDescription
// 								}, function (err, charge) {
// 					  				if (err && err.type === 'StripeCardError') {
// 					  		 			res.json({'Card Declined': true});
// 					  				} else {
// 					  					res.json({'succesful charge': charge});
// 					  				}
// 							});
// 						}
//
// 					});
//
// 			}
// 		}
//
// 	});
// };
