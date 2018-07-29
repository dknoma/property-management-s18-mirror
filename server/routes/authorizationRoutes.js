const usersController = require('../controllers').users;
const messageController = require('../controllers').messages;

module.exports = (app) => {
	app.get('/auth', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/***********************************
	 * Authorization related requests *
	 ***********************************/
    app.post('/api/user/message', messageController.create);
    app.delete('/auth/user/:userId/message/:messageId', messageController.delete);
    app.get('/auth/user/:userId/inbox', messageController.allMessages);

	/* Update profile info */
	app.put('/auth/users/:userId', usersController.update);



    //testing
    app.get('/messages', messageController.listM);

	app.all('/auth/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
