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
	app.delete('/api/users/:userId', usersController.destroy);

	// app.get('/api/:users/todos/:userId', usersController.retrieve);
	// app.post('/api/login', usersController.authenticate);
	
	function genrateToken(user) {
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
				where: {
					username: req.body.username,
				},
				where: {
					email: req.body.email
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
				if(!created) {
					return res.status(404).send({
						message: 'Username or email already exists. Please try again.'
					});
				}
				
				var token = genrateToken(user);

				// return token;
				return res.status(201).send({
					success: true,
					message: 'Stuff',
					token: token
				});
			})
	});

	/* Signup for a tenant account */
	app.post('/api/tenant/signup', (req, res) => {
		return User
			.findOrCreate({
				where: {
					username: req.body.username
				}, 
				defaults: {
					user_type: 'tenant',
					username: req.body.username,
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					password: req.body.password,
					email: req.body.email,
				}
			})
			.spread((user, created) => {
				if(!created) {
					return res.status(404).send({
						message: 'Username already exists. Please try again.'
					});
				}

				var token = genrateToken(user);

				// return token;
				return res.status(201).send({
					success: true,
					message: 'Account was created successfully! Enjoy your token!',
					token: token
				});
			})
	});

	app.all('/api/todos/:todoId/items', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};