const usersController = require('../controllers').users;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/************************************
	 * Authentication related requests  *
	 * 	-	Property manager sign up 	*
	 * 	-	Tenant sign up				*
	 * 	-	Property manager login		*
	 * 	-	Tenant login				*
	 * 	-	User profile update			*
	 ************************************/
	app.post('/api/propertymanager/signup', usersController.pmsignup);
	app.post('/api/tenant/signup', usersController.tsignup);
	app.post('/api/propertymanager/login', usersController.pmlogin);
	app.post('/api/tenant/login', usersController.tlogin);
	app.put('/auth/users/:userId', usersController.update);

	/* temp db testing */
	app.get('/api/users', usersController.list);
	app.get('/auth/users/:userId', usersController.retrieve);
	app.delete('/api/users/:userId', usersController.destroy);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
