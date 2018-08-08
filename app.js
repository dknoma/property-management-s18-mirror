/*
 * Description: Property Management Express Application
 * Start application: npm run start:dev
 */

//include express module
const express = require('express');
const http = require('http');
const app = express();

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port);

const logger = require('morgan');
const bodyParser = require('body-parser');
const authorizor = require('./server/middleware/auth-check')

// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
// auth: middleware for verifying a user through a valid token
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
app.use('/auth', authorizor);

// Require app and server into routes
require('./server/routes/ioRoute')(app, server);
// Require app into routes
require('./server/routes/authenticationRoutes')(app);
require('./server/routes/propRoutes')(app);
require('./server/routes/messageRoutes')(app);
require('./server/routes/paymentRoutes')(app);

app.get('*', (request, response) => response.status(200).send({
	message: 'Welcome to the beginning of Wut.',
}));

module.exports = app;
