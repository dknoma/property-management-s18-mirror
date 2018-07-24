const User = require('../models').User;
const Property = require('../models').Property;
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('./config');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');
const passport = require('passport');

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
	/* List all users; Need to return only non-sensitive info ie. username, first and last name */
	list(req, res) {
		return User
			.findAll({
				include: [{
					model: Property,
					as: 'properties',
				}]
			})
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error));
	},
	/* List a specific user */
	retrieve(req, res) {
		return User
			.findById(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
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
			})
			.catch(error => res.status(400).send(error));
	},
	/* Update information for a specific user */
	update(req, res, next) {
        // console.log(req.header('token'));
		
		return passport.authorize('local-auth', (error, user) => {
			if(error) {
				return res.status(500).send(error);
			}
			console.log(user);

			if(user) {
				return User
					.findById(user.id)
					.then(user => {
						if(!user) {
							return res.status(404).send({
								message: 'User Not Found',
							});
						}
						return user
							.update({
								email: req.body.email || user.email,
								firstname: req.body.firstname || user.firstname,
								lastname: req.body.lastname || user.lastname,
							})
							//allows user to update any valid fields in their account
							//will need to consider securely resetting/changing passwords
							//also need checks when changing email or username; notify pm
							//of any changes to their tenants accounts
							.then(user => res.status(200).send({
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
				return res.status(400).send({
					message: 'ANSFLASF'
				});
			}
		})(req, res, next);
		// try {
		// 	//verify if can update a profile by checking if has valid token
		// 	var currentUser = jwt.verify(req.header.token, config.secret);
		// 	// console.log(currentUser.userId);
		// 	if(req.params.userId == currentUser.userId) {
		// 		return User
		// 		.findById(currentUser.userId)
		// 		.then(user => {
		// 			if(!user) {
		// 				return res.status(404).send({
		// 					message: 'User Not Found',
		// 				});
		// 			}
		// 			return user
		// 				.update({
		// 					email: req.body.email || user.email,
		// 					firstname: req.body.firstname || user.firstname,
		// 					lastname: req.body.lastname || user.lastname,
		// 				})
		// 				//allows user to update any valid fields in their account
		// 				//will need to consider securely resetting/changing passwords
		// 				//also need checks when changing email or username; notify pm
		// 				//of any changes to their tenants accounts
		// 				.then(() => res.status(200).send({
		// 					user: {
		// 						user_type: user.user_type,
		// 						userId: user.id,
		// 						username: user.username,
		// 						email: user.email,
		// 						firstname: user.firstname,
		// 						lastname: user.lastname
		// 					}
		// 				}))
		// 				//409: conflict with an existing resource; ie. duplicate username/emails
		// 				.catch((error) => res.status(409).send(error));
		// 		})
		// 		.catch((error) => res.status(400).send(error));
		// 	} else {
		// 		return res.status(400).send(error);
		// 	}
		// } catch (error) {
		// 	return res.status(400).send({
		// 		message: "Unable to authenticate. Please try again.",
		// 		error
		// 	});
		// }
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
					//status(204).send()) : 204 No Content
					.then(() => res.status(200).send({ message: 'User successfully deleted'}))
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	}
};
