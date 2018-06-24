const usersController = require('../controllers').users;

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
	app.delete('/api/users/:userId', usersController.destroy);

	app.post('/api/propertymanager/signup', usersController.pmsignup);
	app.post('/api/tenant/signup', usersController.tsignup);
	app.post('/api/propertymanager/login', usersController.pmlogin);
	app.post('/api/tenant/login', usersController.tlogin);
	
	app.all('/api/todos/:todoId/items', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};