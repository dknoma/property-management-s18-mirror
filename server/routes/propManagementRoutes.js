// const usersController = require('../controllers').users;
// const propertiesController = require('../controllers').properties;
const propertyManagementController = require('../controllers').propertyManagement;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));
    
    //add tenant to a property
    app.post('/api/propertymanager/add', propertyManagementController.addToProp);
    //get all tenants of a property
    app.get('/api/propertymanager/:propertyId/tenants', propertyManagementController.findTenants);
    //removes a tenant from a property
	app.delete('/api/propertymanager/:propertyId/:tenantId', propertyManagementController.removeTenant);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
