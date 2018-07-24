const User = require('../models').User;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(!req.header('token')) {
        return res.status(401).send();
    }

    try {
        //verify if can update a profile by checking if has valid token
        var currentUser = jwt.verify(req.header('token'), config.secret);
        // console.log(currentUser.userId);
        if(req.params.userId == currentUser.userId) {
            return User
            .findById(currentUser.userId, (err, user) => {
                if (err || !user) {
                  return res.status(401).end();
                }
          
                return next();
            });
        }
    } catch (error) {
        return res.status(401).send({
            message: "Unable to authenticate. Please try again.",
            error
        });
    }
}