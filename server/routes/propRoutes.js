const propertiesController = require('../controllers').properties;
const propertyManagementController = require('../controllers').propertyManagement;
const applicationController = require('../controllers').applcations;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the property API!',
	}));

	/* Property Search Routes */
	/* list and filter property */
	app.get('/api/property/list', propertiesController.list);
	app.post('/api/property/filter',propertiesController.filter);
	app.get('/api/property/:propertyId', propertiesController.retrieve);

	/* Property Manager Routes */
	/* Create property */
    app.post('/api/property/create', propertiesController.create);
    //add tenant to a property
    app.post('/api/propertymanager/add', propertyManagementController.addToProp);
    //get all tenants of a property
    app.get('/api/propertymanager/:propertyId/tenants', propertyManagementController.findTenants);
    //removes a tenant from a property
	app.delete('/api/propertymanager/:propertyId/:tenantId', propertyManagementController.removeTenant);

	/* Application */
	//TODO: create, findAll, delete

	/* Testing */
	app.post('/api/property/adduser', propertiesController.addTest);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
