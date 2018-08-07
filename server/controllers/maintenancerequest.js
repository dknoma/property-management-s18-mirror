const Property = require('../models').Property;
const User = require('../models').User;
const PropertyTenant = require('../models').PropertyTenant;
const Maintenance = require('../models').Maintenance;
const Message = require('../models').Message;

module.exports = {
	create(req, res) {
		User.findById(req.body.tenantId).then(user => {
		var tenant_name = user.firstname + " " + user.lastname;
		return Property
		.findById(req.params.propertyId)
		.then(property => {
			return Maintenance
			.create({
				tenantId: req.body.tenantId,
				tenant_name: tenant_name,
				propertyId: req.params.propertyId,
				property_name: property.property_name,
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
					});
				})
				.catch(error => res.status(400).send(error));
		})
		.catch(error => res.status(400).send(error));
	})
	.catch(error => res.status(400).send(error));
	},

	viewMyMaintenanceRequest(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			return Maintenance
				.findAll({
					where: {
						tenantId: currentUser
					}
				})
				.then(maintenance => {
					return res.status(200).send(maintenance)
				})
				.catch(error => res.status(400).send(error));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}

	},

	reviewMaintenanceRequest(req, res) {
		//verify if PM
		/* if user_type === propertymanager, move on, else 403 restricted */
		var currentUser = req.currentUser;
		if(currentUser) {
			return Property
			.findById(req.params.propertyId)
			.then(property => {
				if(property.userId == currentUser) {
					return Maintenance
						.findAll({
							where: {
								propertyId: req.params.propertyId,
							}
						})
						.then(maintenance => {
							return res.status(200).send(maintenance)
						})
						.catch(error => res.status(400).send(error));
				} else {
					return res.status(400).send({message: 'property userId is not current user'});
				}
			})
			.catch(error => res.status(400).send({message: 'Unable to authenticate. catch error', error}));
		} else {
			return res.status(400).send({message: 'var current user is not current user by token.'});
		}
	},

	//allows pm to view a single maintenance request
	viewSingle(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			Property.findById(req.params.propertyId)
			.then(property => {
				//compare owner of prop to the current user
				if(property.userId == currentUser) {
					//get all applications to the property
					return Maintenance
						.findById(req.params.appId)
						.then(maintenance => {
							return res.status(200).send(maintenance)
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

	//updates approval status of an maintenance request and send message to tenant's inbox
	updateProcessStatus(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			Property.findById(req.params.propertyId)
			.then(property => {
				//compare owner of prop to the current user
				if(property.userId == currentUser) {
					return Maintenance
						.findById(req.params.appId)
						.then(maintenance => {
							if(maintenance.process_status == null) {
								maintenance
								.update({process_status: req.body.processed})
								.then(maintenance => {
									if(maintenance.process_status) {
										Message.create({
											senderId: currentUser,
											receiverId: maintenance.tenantId,
											inboxId: maintenance.tenantId,
											subject: 'Maintenance Status of ' + maintenance.property_name,
											body: 'Your maintenance request to ' + maintenance.property_name + ' has been processed!',
										})
										.then(message => {
											return res.status(201).send({message, maintenance})
										})
										.catch(error => res.status(401).send(error));
									}
								})
								.catch(error => res.status(400).send({message: 'Error in process status.', error}));
							} else {
								res.status(401).send({message: 'Already updated status of this maintenance request.', maintenance});
							}
						})
						.catch(error => res.status(400).send({message: 'Unable to find maintenance request',error}));
				} else {
					return res.status(401).send({message: 'Unable to authorize.'});
				}
			})
			.catch(error => res.status(401).send({message: 'Unable to authorize.', error}));
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	},

	list(req, res) {
		return Maintenance
			.findAll()
			.then(maintenanceRequest => res.status(200).send(maintenanceRequest))
			.catch(error => res.status(400).send(error));
	},

	deleteMaintenanceRequest(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			Property.findById(req.params.propertyId)
			.then(property => {
				if(property.userId = currentUser) {
					return Maintenance
						.findById(req.params.mrId)
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
	},

	deleteOwnMaintenanceRequest(req, res) {
		var currentUser = req.currentUser;
		if(currentUser) {
			return Maintenance
				.findById(req.params.mrId)
				.then(maintenance => {
					if(maintenance.tenantId == currentUser) {
						return maintenance
						.destroy()
						.then(() => res.status(200).send({ message: 'Maintenance request is successfully removed!'}))
					} else {
						return res.status(401).send({message: 'Unable to authorize.'});
					}
				})
		} else {
			return res.status(401).send({message: 'Unable to authorize.'});
		}
	}
}
