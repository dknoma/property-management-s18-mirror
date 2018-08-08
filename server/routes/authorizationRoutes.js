const usersController = require('../controllers').users;
const messageController = require('../controllers').messages;

module.exports = (app) => {
	app.get('/auth', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/************************************
	 * Authorization related requests   *
	 * 	-	Update profile info			*
	 ************************************/
	app.put('/auth/users/:userId', usersController.update);

	app.all('/auth/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
