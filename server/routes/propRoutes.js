const propertiesController = require('../controllers').properties;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the property API!',
	}));

	/* create property */
    app.post('/api/property/create', propertiesController.create);

		/* list and filter property */
		app.get('/api/property/list', propertiesController.list);
		app.post('/api/property/filter',propertiesController.filter);
		app.get('/api/property/:propertyId', propertiesController.retrieve);


	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
