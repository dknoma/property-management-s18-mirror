const paymentController = require('../controllers').payment;


//Private_ key: sk_test_0PHtbfBiBeysTSgQiECHmy18
//pay their rent online & maybe setup automatic deposits (Stripe)


module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Property Mgmt API!',
	}));

	/***********************************
	 * Payment related requests *
	 ***********************************/

	 // Create a new Stripe customer
	 // app.post('/api/payments/newStripeUser/:user_id', paymentController.newStripeUser);
   //
	 // // Add a new credit card to a Stripe customer
	 // app.post('/api/payments/newStripeCard/:user_id', paymentController.newStripeCard);
   //
	 // // Update the default credit card of a Stripe customer
	 // app.post('/api/payments/updateDefaultCard/:user_id', paymentController.updateDefaultCard);

	 // Charge a user
	 app.post('/api/payments/:tenantId/charge', paymentController.charge);

	 //list all payment records
	 app.get('/api/payments/viewall', paymentController.list);


	//  // Update the default card of the user
	//   app.post('/api/payments/updateDefaultCard/:user_id', paymentController.updateDefaultCard);
  //
	// //remove user's card
	// app.post('/api/payments/removeCard/:user_id', paymentController.removeCard);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
