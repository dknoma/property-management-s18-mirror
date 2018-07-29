const propertiesController = require('../controllers').properties;
const propertyManagementController = require('../controllers').propertyManagement;
const applicationController = require('../controllers').applications;
const messageController = require('../controllers').messages;
const maintenanceController = require('../controllers').maintenancerequest;


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
	app.put('/auth/property/:propertyId/applications/:appId', applicationController.updateApprovalStatus);
	app.delete('/auth/property/:propertyId/applications/:appId', applicationController.deleteApplication);
	
	app.get('/auth/user/myapplications', applicationController.viewMyApplications);
    app.delete('/auth/user/myapplications/:appId', applicationController.deleteOwnApplication);


	/* Maintenance request */
	app.post('/api/property/:propertyId/maintain', maintenanceController.create);

		/* Authorization required */
	app.get('/auth/property/:propertyId/review', maintenanceController.reviewMaintenanceRequest);

	//testing
	app.get('/api/:userId/inboxes', messageController.list);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
