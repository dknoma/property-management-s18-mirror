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
	 * Property Management Routes 		  *
	 * 	-	create property				  *
	 *  -	find tenants in a property	  *
	 * 	 +-+ Authorization required +-+	  *
	 * 	-	add tenant to a property	  *
	 *  -	remove tenant from a property *
	 **************************************/
    app.post('/auth/property/create', propertiesController.create);
    app.get('/api/propertymanager/:propertyId/tenants', propertyManagementController.findTenants);
    app.post('/auth/propertymanager/add', propertyManagementController.addToProp);
	app.delete('/auth/propertymanager/:propertyId', propertyManagementController.removeTenant);
	app.put('/auth/propertymanager/updateRent', propertyManagementController.updateRent);

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

	app.get('/auth/user/mypropertyapplications', applicationController.seeAllApplications);
	app.get('/auth/user/:userId/myapplications', applicationController.viewMyApplications);
	app.get('/auth/user/:userId/myapplications/:appId', applicationController.viewMySingle);
	app.delete('/auth/user/:userId/myapplications/:appId', applicationController.deleteOwnApplication);


	/******************************************
	* Maintenance  Routes 					  *
	*  -	create new maintenance request	  *
	* 	 +-+ Authorization required +-+	  	  *
	*  -	view all maintenance request of	  *
	*		a property						  *
	*  -	delete a maintenance request	  *
	*******************************************/
	app.post('/api/property/:propertyId/maintain', maintenanceController.create);
	app.get('/auth/property/:propertyId/maintenancerequests/:appId', maintenanceController.viewSingle);
	app.get('/api/maintenancerequests', maintenanceController.list);
	app.put('/auth/property/:propertyId/maintenancerequests/:mrId', maintenanceController.updateProcessStatus);

		/* Authorization required */
	app.get('/auth/property/:propertyId/maintenancerequests', maintenanceController.reviewMaintenanceRequest);
	app.delete('/auth/property/:propertyId/maintenancerequests/:mrId', maintenanceController.deleteMaintenanceRequest);
	app.get('/auth/user/mymaintenancerequests', maintenanceController.viewMyMaintenanceRequest);
	app.delete('/auth/user/mymaintenancerequests/:mrId', maintenanceController.deleteOwnMaintenanceRequest);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
