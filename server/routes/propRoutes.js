const propertiesController = require('../controllers').properties;
const propertyManagementController = require('../controllers').propertyManagement;
const applicationController = require('../controllers').applications;
const messageController = require('../controllers').messages;

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
    app.get('/api/propertymanager/:propertyId/tenants', propertyManagementController.findTenants);
		/* Authorization required */
    app.post('/auth/propertymanager/add', propertyManagementController.addToProp);
	app.delete('/auth/propertymanager/:propertyId', propertyManagementController.removeTenant);

	/* Application */
	//TODO: delete
	app.post('/api/property/:propertyId/apply', applicationController.create);
		/* Authorization required */
	app.get('/auth/property/:propertyId/applications', applicationController.reviewApplications);



	
	//testing
	app.get('/api/:userId/inboxes', messageController.list);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
