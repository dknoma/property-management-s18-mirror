/*
 * Description: TODO test server. This app will let the user create and delete TODO items
 * 
 * Start application: npm run start:dev
 * Start postgres: pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start
 * Postman: 
 * 			- to create items: 127.0.0.1:8000/api/todos/1/items
 * 
 * Create model: sequelize model:create --name <Name> --attributes <name of attribute>:<type>
 */

//include express module
//express app
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
// const passport = require('passport');

//creates the express application
const app = express();

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// app.use(passport.initialize());

// Load passport stratgies
// const localAuthStrat = require('./server/passport/local-auth');
// passport.use('local-auth', localAuthStrat);

// Require our various routes into the application.
require('./server/routes/authenticationRoutes')(app);
require('./server/routes/propRoutes')(app);
require('./server/routes/authorizationRoutes')(app);

app.get('*', (request, response) => response.status(200).send({
	message: 'Welcome to the beginning of Wut.',
}));

module.exports = app;
