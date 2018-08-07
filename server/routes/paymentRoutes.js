const paymentController = require('../controllers').payment;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Property Mgmt API!',
	}));

	/***********************************
	 * Payment related requests *
	 ***********************************/
	// Charge a user
	app.post('/api/payments/:tenantId/charge', paymentController.charge);
	//list all payment records
	app.get('/api/payments/viewall', paymentController.list);
	app.post('/api/payments/getRent', paymentController.retrieve);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
