const User = require('../models').User;
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');

/*
 * Title:	Authentication Middleware
 * Author:	Drew Noma
 * Description: 
 *				This Express.js middleware allows JWT tokens that are passed through the header
 *				to try and be authenticated. If the token is successfully verified then the
 *				middleware will try and get the user id from the token and find a User with that
 *				user id. If a user exists with that id, then a new parameter, currentUser, is then
 *				assigned the user id and is added to the request object, and the middleware passes 
 *				on to the next middleware. If no user id is found, then current user becomes false.
 *				If an error occurs during authentication, then the error is then sent through the
 *				response object and the route immediately returns. 
 *
 * Input:	request object
 * 			responsed object
 * 			next middleware
 * Output:	Current user id (based on the JWT)
 */
module.exports = function authorize(req, res, next) {
	if(!req.header('token')
		|| req.header('token') == null
		|| req.header('token') == undefined) {
		return res.status(401).send({message: 'Unable to authenticate'});
	}

	try {
		//verify token passed from header
		var currentUser = jwt.verify(req.header('token'), config.secret);
		//if a userId is found from the token, find a User with that id, else user is false
		if(currentUser.userId) {
			User.findById(currentUser.userId)
				.then(user => {
					//creates a new currentUser parameter for the req object
					req.currentUser = user.id;
					next();
				})
				.catch((err, user) => {
					if (err || !user) {
						return res.status(401).send({message: 'Unable to authenticate'});
					}
				});
		} else {
			req.currentUser = false;
			next();
		}
	} catch (err) {
		return res.status(401).send({message: 'Unable to authenticate', err});
	}
}
