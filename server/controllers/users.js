const User = require('../models').User;
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');
const config = require('./config');
const Op = Sequelize.Op;
const bcrypt = require('bcrypt');

/* Function to generate a JWT token for the user */
function generateToken(user) {
	//payload to create token; does not contain sensitive info
	const payload = {username: user.username};
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
				// user: user,
				username: user.username,
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
				// user: user,
				username: user.username,
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
							// user: user,
							username: user.username,
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
					return res.status(204).send({
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
							// user: user,
							username: user.username,
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
			.findAll()
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
				return res.status(200).send(user);
			})
			.catch(error => res.status(400).send(error));
	},
	/* Update information for a specific user */
	update(req, res) {
		return User
			.findById(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				return user
					.update(req.body, { fields: Object.keys(req.body) })
					//allows user to update any valid fields in their account
					//will need to consider securely resetting/changing passwords
					//also need checks when changing email or username; notify pm
					//of any changes to their tenants accounts
					.then(() => res.status(200).send(user))
					//409: conflict with an existing resource; ie. duplicate username/emails
					.catch((error) => res.status(409).send(error));
			})
			.catch((error) => res.status(400).send(error));
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
