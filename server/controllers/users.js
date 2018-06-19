const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = {
list(req, res) {
	return User
		.findAll()
		.then(users => res.status(200).send(users))
		.catch(error => res.status(400).send(error));
},
retrieve(req, res) {
	return User
		.findById(req.params.userId)
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
			.findById(req.params.userId)
			.then(user => {
				if(!user) {
					return res.status(404).send({
						message: 'User Not Found',
					});
				}
				return user
					.update( req.body, { fields: Object.keys(req.body) })
					// .update({
					// 	password: req.body.password || user.password,
					// })
					.then(() => res.status(200).send(user))
					.catch((error) => res.status(400).send(error));
			})
			.catch((error) => res.status(400).send(error));
	},
	destroy(req, res) {
		return User
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