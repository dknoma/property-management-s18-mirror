const passport = require('passport');
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

        console.log(currentUser);

        if(req.params.userId == currentUser.userId) {
            return done(null, true);
        } else {
            return done(null, false);
        }
    } catch (Error) {
        return done(Error);
    }
});