// const usersController = require('../controllers').users;
// const propertiesController = require('../controllers').properties;
const propertyManagementController = require('../controllers').propertyManagement;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	app.post('/api/propertymanager/add', propertyManagementController.addToProp);
	app.get('/api/propertymanager/:propertyId/tenants', propertyManagementController.findTenants);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
