const usersController = require('../controllers').users;
const messageController = require('../controllers').messages;
const applicationController = require('../controllers').applications;

module.exports = (app) => {
	app.get('/auth', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/**************************************
	 * Message Routes 					  *
	 * 	-	create and send message		  *
	 * 	 +-+ Authorization required +-+	  *
	 *  -	get all messages			  *
	 * 	-	delete message				  *
	 **************************************/
	app.post('/auth/user/message', messageController.create);
    app.get('/auth/user/:userId/inbox', messageController.allMessages);
    app.get('/auth/user/:userId/inbox/:messageId', messageController.viewMessage);
    app.delete('/auth/user/:userId/message/:messageId', messageController.delete);

	app.all('/auth/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
