const usersController = require('../controllers').users;
const messageController = require('../controllers').messages;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/***********************************
	 * Authorization related requests *
	 ***********************************/
    app.post('/api/user/message', messageController.create);
    app.delete('/auth/user/:userId/message/:messageId', messageController.delete);
    app.get('/auth/user/:userId/inbox', messageController.allMessages);
    

    //testing
    app.get('/messages', messageController.listM);

	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
