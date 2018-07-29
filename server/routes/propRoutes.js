const propertiesController = require('../controllers').properties;
const propertyManagementController = require('../controllers').propertyManagement;
const applicationController = require('../controllers').applications;
const messageController = require('../controllers').messages;
const maintenanceController = require('../controllers').maintenanceRequest;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the property API!',
	}));

	/**************************************
	 * Property Routes 					  *
	 * 	-	get all properties			  *
	 *  -	filter property results		  *
	 * 	-	get specific property profile *
	 **************************************/
	app.get('/api/property/list', propertiesController.list);
	app.post('/api/property/filter',propertiesController.filter);
	app.get('/api/property/:propertyId', propertiesController.retrieve);
	app.post('/api/property/:propertyId/maintenance', maintenanceController.create)

	/**************************************
	 * Property Manager Routes 			  *
	 * 	-	create property				  *
	 *  -	find tenants in a property	  *
	 * 	 +-+ Authorization required +-+	  *
	 * 	-	add tenant to a property	  *
	 *  -	remove tenant from a property *
	 **************************************/
    app.post('/api/property/create', propertiesController.create);
    app.get('/api/propertymanager/:propertyId/tenants', propertyManagementController.findTenants);
    app.post('/auth/propertymanager/add', propertyManagementController.addToProp);
	app.delete('/auth/propertymanager/:propertyId', propertyManagementController.removeTenant);

	/**************************************
	 * Application  Routes 				  *
	 * 	-	create application			  *
	 * 	 +-+ Authorization required +-+	  *
	 *  -	view all applications of	  *
	 * 		a property					  *
	 * 	-	view a single application	  *
	 *  -	delete application			  *
	 **************************************/
	app.post('/api/property/:propertyId/apply', applicationController.create);
	app.get('/auth/property/:propertyId/applications', applicationController.reviewApplications);
    app.get('/auth/property/:propertyId/applications/:appId', applicationController.viewSingle);
    app.delete('/auth/property/:propertyId/applications/:appId', applicationController.deleteApplication);




	//testing
	app.get('/api/:userId/inboxes', messageController.list);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
