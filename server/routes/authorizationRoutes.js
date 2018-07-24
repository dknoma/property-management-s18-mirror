const usersController = require('../controllers').users;
const messageController = require('../controllers').messages;

module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
	}));

	/***********************************
	 * Authorization related requests *
	 ***********************************/
    app.get('/api/messages', messageController.listM);
    app.post('/api/user/message', messageController.create);
    app.get('/api/user/:userId/inbox', messageController.allMessages);
    
	app.all('/api/users', (req, res) =>
		res.status(405).send({
			message: 'Method Not Allowed',
	}));
};
