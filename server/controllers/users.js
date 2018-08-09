const User = require('../models').User;
const Property = require('../models').Property;
const Inbox = require('../models').Inbox;
const Message = require('../models').Message;
const Sequelize = require('sequelize');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
// const passport = require('passport');

/* Function to generate a JWT token for the user */
function generateToken(user) {
	//payload to create token; does not contain sensitive info
	const payload = {
		userId: user.id,
		user_type: user.user_type
	};
	try {
		return token = jwt.sign(payload, config.secret, {
			expiresIn: "24h" //expires after 24 hours
		});
	} catch (Error) {
		return res.status(400).send({
			message: 'Unable to get token.'
		});
	}
}

module.exports = {
	pmsignup(req, res) {
		return User
		.findOrCreate({
			//tries to find a User with username and/or email and returns false if that User exists
			where: {
				[Op.or]: [
					{username: req.body.username},
					{email: req.body.email}
				]
			},
			defaults: {
				user_type: 'propertymanager',
				username: req.body.username.trim(),
				firstname: req.body.firstname.trim(),
				lastname: req.body.lastname.trim(),
				password: req.body.password.trim(),
				email: req.body.email.trim(),
			}
		})
		.spread((user, created) => {
			//password confirmation can be done in front end
			//if account does exists, need to try again
			if(!created) {
				//409: conflict with an existing resource; ie. duplicate username/emails
				return res.status(409).send({
					message: 'Username or email already exists. Please try again.'
				});
			}
			Inbox.create({
				userId: user.id
			});
			//generate the token
			var token = generateToken(user);
			//returns the user and token
			return res.status(201).send({
				user: {
					user_type: user.user_type,
					userId: user.id,
					username: user.username,
					email: user.email,
					firstname: user.firstname,
					lastname: user.lastname
				},
				message: 'Account was created successfully! Enjoy your token!',
				token: token
			});
		})
		.catch(error => res.status(400).send(error));
	},
	tsignup(req, res) {
		return User
		.findOrCreate({
			where: {
				[Op.or]: [
					{username: req.body.username},
					{email: req.body.email}
				]
			},
			defaults: {
				user_type: 'tenant',
				username: req.body.username.trim(),
				firstname: req.body.firstname.trim(),
				lastname: req.body.lastname.trim(),
				password: req.body.password.trim(),
				email: req.body.email.trim(),
			}
		})
		.spread((user, created) => {
			if(!created) {
				//409: conflict with an existing resource; ie. duplicate username/emails
				return res.status(409).send({
					message: 'Username or email already exists. Please try again.'
				});
			}
			Inbox.create({
				userId: user.id
			});

			var token = generateToken(user);
			//returns the user and token
			return res.status(201).send({
				user: {
					user_type: user.user_type,
					userId: user.id,
					username: user.username,
					email: user.email,
					firstname: user.firstname,
					lastname: user.lastname
				},
				message: 'Account was created successfully! Enjoy your token!',
				token: token
			});
		})
		.catch(error => res.status(400).send(error));
	},
	pmlogin(req, res) {
		return User
			.findOne({
				where: {username: req.body.username}
			})
			.then(user => {
				if(!user) {
					//401: for invalid authorization credentials
					return res.status(401).send({
						message: 'Username or password is wrong. Please try again.'
					});
				}
				//safely compares encrypted password
				bcrypt.compare(req.body.password, user.password).then(match => {
					if(!match) {
						//401: for invalid authorization credentials
						return res.status(401).send({
							message: 'Username or password is wrong. Please try again.'
						});
					} else {
						var token = generateToken(user);
						//returns the user and token
						return res.status(201).send({
							user: {
								user_type: user.user_type,
								userId: user.id,
								username: user.username,
								email: user.email,
								firstname: user.firstname,
								lastname: user.lastname
							},
							message: "Login successful!",
							token: token
						});
					}
				});
			})
			.catch(error => res.status(400).send(error));
	},
	tlogin(req, res) {
		return User
			.findOne({
				where: {username: req.body.username}
			})
			.then(user => {
				if(!user) {
					return res.status(401).send({
						message: 'Username or password is wrong. Please try again.'
					})
				}
				bcrypt.compare(req.body.password, user.password).then(match => {
					if(!match) {
						//401: for invalid authorization credentials
						return res.status(401).send({
							message: 'Username or password is wrong. Please try again.'
						});
					} else {
						var token = generateToken(user);
						//returns the user and token
						return res.status(201).send({
							user: {
								user_type: user.user_type,
								userId: user.id,
								username: user.username,
								email: user.email,
								firstname: user.firstname,
								lastname: user.lastname
							},
							message: "Login successful!",
							token: token
						});
					}
				});
			})
			.catch(error => res.status(400).send(error));
	},
	/* List a specific user */
	retrieve(req, res) {
		var currentUser = req.currentUser;
		return User
			.find({
				where: {id: req.params.userId},
				//include properties in search
				include: [{
					model: Property,
					as: 'properties',
				},{
					//include inbox and messages in search; nested include
					model: Inbox,
					as: 'inboxes',
					include: [{
						model: Message,
						as: 'messages',
					}]
				}]
			})
			.then((user) => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				//if user is owner of profile, allow to view properties and inbox, else can only view profile page
				if(req.params.userId == currentUser) {
					return res.status(200).send({
						user: {
							user_type: user.user_type,
							userId: user.id,
							username: user.username,
							email: user.email,
							firstname: user.firstname,
							lastname: user.lastname
						},
						properties: user.properties,
						inboxes: user.inboxes,
					});
				} else {
					return res.status(200).send({
						user: {
							user_type: user.user_type,
							userId: user.id,
							username: user.username,
							email: user.email,
							firstname: user.firstname,
							lastname: user.lastname
						}
					});
				}
			})
			.catch(error => res.status(400).send(error));
	},
	/* Update information for a specific user */
	update(req, res) {
		//verify if can update a profile by checking if has valid token
		var currentUser = req.currentUser;
		if(req.params.userId == currentUser) {
			return User
			.findById(currentUser)
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				return user
					//allows user to update any valid fields in their account
					//also need checks when changing email or username; notify pm
					//of any changes to their tenants accounts
					.update({
						email: req.body.email || user.email,
						firstname: req.body.firstname || user.firstname,
						lastname: req.body.lastname || user.lastname,
					})
					.then(() => res.status(200).send({
						user: {
							user_type: user.user_type,
							userId: user.id,
							username: user.username,
							email: user.email,
							firstname: user.firstname,
							lastname: user.lastname
						}
					}))
					//409: conflict with an existing resource; ie. duplicate username/emails
					.catch((error) => res.status(409).send(error));
			})
			.catch((error) => res.status(400).send(error));
		} else {
			return res.status(400).send({message: 'Unable to authenticate.'});
		}
	},
	// /* Deletes a user from db */
	destroy(req, res) {
		return User
			.findById(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				return user
					.destroy()
					.then(() => res.status(200).send({ message: 'User successfully deleted'}))
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	}
};
