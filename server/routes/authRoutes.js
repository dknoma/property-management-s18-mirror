const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
const User = require('../models').User;
const jwt = require('jsonwebtoken');


module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/*************************
	 * User related requests *
	 *************************/
	app.get('/api/users', usersController.list);
	app.get('/api/users/:userId', usersController.retrieve);
	app.put('/api/users/:userId', usersController.update);
	// app.delete('/api/users/:userId', usersController.destroy);
	
	/* Function to generate a JWT token for the user */
	function generateToken(user) {
		//payload to create token; does not contain sensitive info
		const payload = {username: user.username};
		try {
			return token = jwt.sign(payload, app.get('superSecret'), {
				expiresIn: "24h" //expires after 24 hours
			});
		} catch (Error) {
			return res.status(400).send({
				message: 'Unable to get token.'
			});
		}
	}

	/* Signup for a property manager account */
	app.post('/api/propertymanager/signup', (req, res) => {
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
					return res.status(204).send({
						message: 'Username or email already exists. Please try again.'
					},{
						redirectURI: "/propertymanager/signup"
					});
				}
				//generate the token
				var token = generateToken(user);
				//returns the user and token
				res.json({
					user: user,
					token: token
				});
				return res.status(201).send({
					user: user,
					message: 'Account was created successfully! Enjoy your token!',
					token: token
				});
			})
			.catch(error => res.status(400).send(error));
	});

	/* Signup for a tenant account */
	app.post('/api/tenant/signup', (req, res) => {
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
					return res.status(204).send({
						message: 'Username or email already exists. Please try again.'
					},{
						redirectURI: "/tenant/signup"
					});
				}

				var token = generateToken(user);
				//returns the user and token
				res.json({
					user: user,
					token: token
				});
				return res.status(201).send({
					user: user,
					message: 'Account was created successfully! Enjoy your token!',
					token: token
				});
			})
			.catch(error => res.status(400).send(error));
	});

	/* Property manager login */
	app.post('/api/propertymanager/login', (req, res) => {
		return User
			.findOne({
				where: {username: req.body.username}
			})
			.then( user => {
				if(!user) {
					return res.status(204).send({
						message: 'Username or password is wrong. Please try again.'
					})
					// return res.status(200).json({redirectURI: "/projectmanager/login"});
				}
				//safely compares encrypted password
				if(!bcrypt.compare(req.body.password, user.password)) {
					return res.status(204).send({
						message: 'Username or password is wrong. Please try again.'
					})
				}
				var token = generateToken(user);
				//returns the user and token
				res.json({
					user: user,
					token: token
				});
				return res.status(201).send({
					user: user,
					message: 'Login successful!',
					token: token
				});
			})
			.catch(error => res.status(400).send(error));
	});

	/* Tenant login */
	app.post('/api/tenant/login', (req, res) => {
		return User
			.findOne({
				where: {username: req.body.username}
			})
			.then(user => {
				if(!user) {
					return res.status(204).send({
						message: 'Username or password is wrong. Please try again.'
					})
					// return res.status(200).json({redirectURI: "/tenant/login"});
				}
				if(!bcrypt.compare(req.body.password, user.password)) {
					return res.status(204).send({
						message: 'Username or password is wrong. Please try again.'
					});
				}
				var token = generateToken(user);
				//returns the user and token
				res.json({
					user: user,
					token: token
				});
				return res.status(201).send({
					user: user,
					message: 'Login successful!',
					token: token
				});
			})
			.catch(error => res.status(400).send(error));
	});

	app.all('/api/todos/:todoId/items', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};