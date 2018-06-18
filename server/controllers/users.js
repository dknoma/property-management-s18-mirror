const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
	create(req, res) {
		return User
			.findOrCreate({
				where: {
					username: req.body.username
				}, 
				defaults: {
					user_type: req.params.user_type,
					username: req.body.username,
					firstname: req.body.firstname,
					lastname: req.body.lastname,
					password: req.body.password,
					email: req.body.email,
				}
			})
			.then(user => {
					res.status(200).send(user);
				}
			)
			.catch(error => {
				res.status(400).send(error);
			});
	},
	signup(req, res) {
		return User
		.findOrCreate({
			where: {
				username: req.body.username
			}, 
			defaults: {
				user_type: req.params.user_type,
				username: req.body.username,
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				password: req.body.password,
				email: req.body.email,
			}
		})
		.then(user => {
			if(!user) {
				return res.status(404).send({
					//message: Authentication failed. Username or password is wrong'
					message: 'User Not Found'
				});
			} else {
				if(user.username !== req.body.username) {
					return res.status(404).send({
						message: 'Authentication failed. Username or password is wrong.'
						// message: 'User Not Found'
					});
				}
				if (user.password !== req.body.password) {
					return res.status(404).send({
						message: 'Authentication failed. Username or password is wrong.'
						// message: 'Authentication failed. Password is wrong'
					});
				}
				//payload to create token; does not contain sensitive info
				const payload = {username: user.username};

				try {
					var token = jwt.sign(payload, process.env.JWT_SECRET, {
						expiresIn: "24h" //expires after 24 hours
					});
				} catch (Error) {
					return res.status(400).send({
						message: 'Unable to get token.'
					});
				}

				return token;
				// return res.status(201).send({
				// 	success: true,
				// 	message: 'Stuff',
				// 	token: token
				// });
			}
		})
		.catch(error => res.status(400).send(error));
	},
	list(req, res) {
		return User
			.findAll({
				// include: [{
				// 	model: Todo,
				// 	as: 'todos',
				// 	include: [{
				// 		model: TodoItem, 
				// 		as: 'todoItems'
				// 	}],
				// }]
			})
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error));
	},
	retrieve(req, res) {
		return User
			//find the given username from the table
			// .find({ where: {username: req.params.username}}, {
			.findById(req.params.userId, {
				// include: [{
				// 	model: Todo,
				// 	as: 'todos',
				// 	include: [{
				// 		model: TodoItem, 
				// 		as: 'todoItems'
				// 	}],
				// }]
			})
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				return res.status(200).send(user);
			})
			.catch(error => res.status(400).send(error));
	},
	update(req, res) {
		return User
			// .findById(req.params.username, {
			.findById(req.params.userId, {
				include: [{
					model: User,
					as: 'users',
				}],
			})
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				return user
					.update({
						password: req.body.password || user.password,
					})
					.then(() => res.status(200).send(user))
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},
	destroy(req, res) {
		return User
			//find the given username from the table
			// .find({ where: {username: req.params.username}})
			.findById(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(400).send({
						message: 'User Not Found',
					});
				}
				return user
					.destroy()
					//status(204).send()) : 204 No Content
					.then(() => res.status(200).send({ message: 'User successfully deleted'}))
					.catch(error => res.status(400).send(error));
			})
			.catch(error => res.status(400).send(error));
	}
};