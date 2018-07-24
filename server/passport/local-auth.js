const passport = require('passport');
const config = require('../controllers/config');
const User = require('../models').User;
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

/* Authenticating correct user */
module.exports =  new LocalStrategy({
    passReqToCallback: true
}, (req, done) => {
    if (err) { 
        return done(err); 
    }

    var token = req.header('token');
    console.log(token);
    
    try {
        var currentUser = jwt.verify(token, config.secret);
        // console.log(currentUser);

        return User.findById(currentUser.userId)
            .then(user => {
                if(!user) {
                    return done(null, false);
                }
                if(req.params.userId == user.userId) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch((error) => res.status(400).send(error));
        
    } catch (Error) {
        return done(Error);
    }
});