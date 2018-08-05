const Property = require('../models').Property;
const User = require('../models').User;
const PropertyTenant = require('../models').PropertyTenant;
const Application = require('../models').Application;
const Message = require('../models').Message;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
	//allows tenants to apply to properties
	create(req, res) {
		User.findById(req.body.tenantId).then(user => {
			var tenant_name = user.firstname + " " + user.lastname;

			return Property
			.findById(req.params.propertyId)
			.then(property => {
				return Application

				.findOrCreate({
					//tries to find user already has an existing application for the property
					where: {
						[Op.and]: [
							{tenantId: req.body.tenantId,},
							{propertyId: req.params.propertyId}
						]
					},
					defaults: {
						tenantId: req.body.tenantId,
						tenant_name: tenant_name,
						propertyId: req.params.propertyId,
						pmId: property.userId,
						property_name: property.property_name,
						form_subject: req.body.form_subject.trim(),
						form_body: req.body.form_body.trim(),
						rent: req.body.rent,
					}
				})
				.spread((application, created) => {
					//if relation exists, need to try again
					if(!created) {
						return res.status(409).send({
							message: 'You already applied to this property!'
						});
					}
					if(application == null) {
						//409: conflict with an existing resource; ie. duplicate username/emails
						return res.status(404).send({
							message: 'An error has occurred. Please try again.'
						});
					}

					return res.status(201).send({
							application,
							message: 'Application was sent successfully!'
					})
				})
				.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
	},
	viewMyApplications(req, res) {
		var currentUser = req.currentUser;
		if(currentUser && req.params.userId == currentUser) {
			return Application
				.findAll({
					where: {
						tenantId: currentUser
					}
				})
				.then(applications => {
					return res.status(200).send(applications)
				})
				.catch(error => res.status(400).send(error));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}

	},
	//allows pm to view applications to a property
	reviewApplications(req, res) {
		//verify if PM
		/* if user_type === propertymanager, move on, else 403 restricted */
		var currentUser = req.currentUser;
		if(currentUser) {
			//find property by propId
			Property.findById(req.params.propertyId)
			.then(property => {
				//compare owner of prop to the current user
				if(property.userId == currentUser) {
					//get all applications to the property
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
				} else {
					return res.status(401).send({message: 'Unable to authorize.'});
				}
			})
			.catch(error => res.status(401).send({message: 'Unable to authorize.', error}));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	},
	//allows pm to view all applications to all their properties
	seeAllApplications(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			return Application
				.findAll({
					where: {
						pmId: currentUser,
					}
				})
				.then(applications => {
					return res.status(200).send(applications)
				})
				.catch(error => res.status(400).send(error));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	},
	//allows pm to view a single application
	viewSingle(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			Property.findById(req.params.propertyId)
			.then(property => {
				//compare owner of prop to the current user
				if(property.userId == currentUser) {
					//get all applications to the property
					return Application
						.findById(req.params.appId)
						.then(application => {
							return res.status(200).send(application)
						})
						.catch(error => res.status(400).send(error));
				} else {
					return res.status(401).send({message: 'Unable to authorize.'});
				}
			})
			.catch(error => res.status(401).send({message: 'Unable to authorize.', error}));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	},
	viewMySingle(req, res) {
		var currentUser = req.currentUser;
		if(currentUser && req.params.userId == currentUser) {
			return Application
				.findById(req.params.appId)
				.then(application => {
					if(application.tenantId == currentUser) {
						return res.status(200).send(application)
					} else {
						return res.status(401).send({message: 'Unable to authorize.'});
					}
				})
				.catch(error => res.status(400).send(error));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	},
	//updates approval status of an application and send message to applicants inbox
	updateApprovalStatus(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			Property.findById(req.params.propertyId)
			.then(property => {
				//compare owner of prop to the current user
				if(property.userId == currentUser) {
					return Application
						.findById(req.params.appId)
						.then(application => {
							if(application.approval_status == null) {
								application
								.update({approval_status: req.body.approval_status})
								.then(application => {
									User.findById(currentUser)
									.then(user => {
										if(application.approval_status) {
											Message.create({
												senderId: currentUser,
												sender_username: user.username,
												receiverId: application.tenantId,
												inboxId: application.tenantId,
												subject: 'Application Status of ' + application.property_name,
												body: 'Your application to ' + application.property_name + ' has been approved!' + 'rent is' + application.rent,
											})
											.then(message => {
												return res.status(201).send({message, application})
											})
											.catch(error => res.status(401).send(error));
										} else {
											Message.create({
												senderId: currentUser,
												sender_username: user.username,
												receiverId: application.tenantId,
												inboxId: application.tenantId,
												subject: 'Application Status of ' + application.property_name,
												body: 'Unfortunately your application to ' + application.property_name + ' has been denied.',
											})
											.then(message => {
												return res.status(201).send({message, application})
											})
											.catch(error => res.status(401).send(error));
										}
									})
								})
								.catch(error => res.status(400).send({message: 'Error in approval status.', error}));
							} else {
								res.status(401).send({message: 'Already updated status of application.', application});
							}
						})
						.catch(error => res.status(400).send({message: 'Unable to find application',error}));
				} else {
					return res.status(401).send({message: 'Unable to authorize.'});
				}
			})
			.catch(error => res.status(401).send({message: 'Unable to authorize.', error}));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	},
	//allows pm to delete an application
	deleteApplication(req, res) {
		//authorize if user owns the property
		var currentUser = req.currentUser;
		if(currentUser) {
			Property.findById(req.params.propertyId)
			.then(property => {
				if(property.userId == currentUser) {
					//find application by specified tenant for specified property
					return Application
						.findById(req.params.appId)
						.then(application => {
							return application
								.destroy()
								.then(() => res.status(200).send({ message: 'Application successfully removed!'}))
						})
				} else {
					return res.status(401).send({message: 'Unable to authorize.'});
				}
			})
			.catch(error => res.status(400).send({message: 'An error has occured', error}));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	},
	deleteOwnApplication(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			return Application
				.findById(req.params.appId)
				.then(application => {
					if(req.params.userId == currentUser && application.tenantId == currentUser) {
						return application
						.destroy()
						.then(() => res.status(200).send({ message: 'Application successfully removed!'}))
					} else {
						return res.status(401).send({message: 'Unable to authorize.'});
					}
				})
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	}
};
