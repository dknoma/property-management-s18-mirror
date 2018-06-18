const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
// const User = require('../models').User;
// const jwt = require('jsonwebtoken');


module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/*************************
	 * Todo related requests *
	 *************************/
	/* Creates a todo */
	// app.post('/api/users/:userId/todos', todosController.create);
	// // app.post('/api/users/:userId/todos/:id', todosController.createWithId);

	// /* Gets all todos of a given userId */
	// app.get('/api/users/:userId/todos', todosController.list);

	// /* Gets a specific todo from a given userId */
	// app.get('/api/users/:userId/todos/:todoId', todosController.retrieve);

	// /* Todo related requests */
	// app.post('/api/todos', todosController.create);
	// // app.post('/api/todos/:id', todosController.createWithId);
	// app.get('/api/todos', todosController.list);
	// app.get('/api/todos/:todoId', todosController.retrieve);
	// app.put('/api/todos/:todoId', todosController.update);
	// app.delete('/api/todos/:todoId', todosController.destroy);

	/*****************************
	 * TodoItem related requests *
	 *****************************/
	/* Creates a todoItem */
	// app.post('/api/users/:userId/todos/:todoId/items', todoItemsController.create);

	// /* Updates a todoItem */
	// app.put('/api/users/:userId/todos/:todoId/items/:todoItemId', todoItemsController.update);

	// /* Deletes a todoItem */
	// app.delete('/api/users/:userId/todos/:todoId/items/:todoItemId', todoItemsController.destroy);

	/*************************
	 * User related requests *
	 *************************/
	// app.post('/api/users', usersController.create);
	app.get('/api/propertymanager', usersController.list);
	app.get('/api/users/:userId', usersController.retrieve);
	app.delete('/api/users/:userId', usersController.destroy);

	// app.get('/api/:users/todos/:userId', usersController.retrieve);
	// app.post('/api/login', usersController.authenticate);
	
	app.post('/api/signup', usersController.signup);
	app.post('/api/signup', (req, res) => {
		// return User
		// 	.find({where: {username: req.body.username}})
		// 	.then(user => {
		// 		if(!user) {
		// 			return res.status(404).send({
		// 				//message: Authentication failed. Username or password is wrong'
		// 				message: 'User Not Found'
		// 			});
		// 		} else {
		// 			if(user.username !== req.body.username) {
		// 				return res.status(404).send({
		// 					message: 'Authentication failed. Username or password is wrong.'
		// 					// message: 'User Not Found'
		// 				});
		// 			}
		// 			if (user.password !== req.body.password) {
		// 				return res.status(404).send({
		// 					message: 'Authentication failed. Username or password is wrong.'
		// 					// message: 'Authentication failed. Password is wrong'
		// 				});
		// 			}
		// 			//payload to create token; does not contain sensitive info
		// 			const payload = {username: user.username};

		// 			try {
		// 				var token = jwt.sign(payload, app.get('superSecret'), {
		// 					expiresIn: "24h" //expires after 24 hours
		// 				});
		// 			} catch (Error) {
		// 				return res.status(400).send({
		// 					message: 'Unable to get token.'
		// 				});
		// 			}

		// 			return res.status(201).send({
		// 				success: true,
		// 				message: 'Stuff',
		// 				token: token
		// 			});
		// 		}
		// 	})
		// 	.catch(error => res.status(400).send(error));
		},
	);

	app.all('/api/todos/:todoId/items', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};