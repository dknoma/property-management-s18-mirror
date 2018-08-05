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
const express = require('express');
const http = require('http');
//creates the express application, port, and server
const app = express();
const port = parseInt(process.env.PORT, 10) || 8080;
app.set('port', port);

//socket.io
const server = http.createServer(app);
server.listen(port);
// const io = require('socket.io')(server);
// io.on('connection', () => {});

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

// Require our various routes into the application.
require('./server/routes/ioRoute')(app);
require('./server/routes/authenticationRoutes')(app);
require('./server/routes/propRoutes')(app);
require('./server/routes/messageRoutes')(app);
require('./server/routes/paymentRoutes')(app);

app.get('*', (request, response) => response.status(200).send({
	message: 'Welcome to the beginning of Wut.',
}));

module.exports = app;
