


const todosController = require('../controllers').todos;
const todoItemsController = require('../controllers').todoItems;
const usersController = require('../controllers').users;
// const logger = require('../controllers').logger;
// const token = require('../controllers').token;
// const validate = require('../middlewares').validate;
// const auth = require('../middlewares').auth;
// const adminAuth = require('../middlewares').adminAuth;
// const admin = require('../controllers').admin;
module.exports = (app) => {
	app.get('/api', (req, res) => res.status(200).send({
		message: 'Welcome to the Todos API!',
		}));
	//app.post('/createUser',adminAuth.check,user.create);
  // app.post('/createUser',user.create);
	// app.post('/createAdmin',admin.create);
	// app.post('/createKey',auth.check,token.create);
//	app.post('/api/todos', validate.check, todosController.create);
  //app.post('/api/todos', todosController.create);
	app.get('/api/todos', todosController.list);
	app.post('/api/todos/:todoId/items',todoItemsController.create);
	app.get('/api/todos/:todoId', todosController.retrieve);

	app.post('/api/users', usersController.create);

//Check user's passowrd
app.post('/api/users/check', usersController.userSignin);

//Get user info
// app.get('/api/users/:userid', usersController.retrieve);
//
// //Update user info
// app.post('/api/users/:userid', usersController.update);
//
// //Update password
// app.post('/api/users/pwd/:userid', usersController.updatePwd);
};
