const propertyiesontroller = require('../controllers').properties;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/***********************************
	 * Authentication related requests *
	 ***********************************/
    app.post('/api/property', propertyiesontroller.create);
    
    
	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
