const User = require('../models').User;
const Sequelize = require('sequelize');
const jwt = require('jsonwebtoken');

module.exports = {
	/* List all users; Need to return only non-sensitive info ie. username, first and last name */
	list(req, res) {
		return User
			.findAll()
			.then(users => res.status(200).send(users))
			.catch(error => res.status(400).send(error));
	},
	/* List a specific user */
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
	/* Update information for a specific user */
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
					//allows user to update any valid fields in their account
					//will need to consider securely resetting/changing passwords
					//also need checks when changing email or username; notify pm
					//of any changes to their tenants accounts

					.then(() => res.status(200).send(user));
			})
			.catch((error) => res.status(400).send(error));
	},
	// /* Deletes a user from db */
	// destroy(req, res) {
	// 	return User
	// 		.findById(req.params.userId)
	// 		.then(user => {
	// 			if(!user) {
	// 				return res.status(204).send({
	// 					message: 'User Not Found',
	// 				});
	// 			}
	// 			return user
	// 				.destroy()
	// 				//status(204).send()) : 204 No Content
	// 				.then(() => res.status(200).send({ message: 'User successfully deleted'}))
	// 				.catch(error => res.status(400).send(error));
	// 		})
	// 		.catch(error => res.status(400).send(error));
	// }
};