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
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

//socket.io
const server = http.createServer(app);
server.listen(port);
const io = require('socket.io')(server);
io.on('connection', () => {});

// let users = {};
//
// getUsers = () => {
//     return Object.keys(users).map(function(key){
//         return users[key].username
//     });
// };
//
// createSocket = (user) => {
//     let cur_user = users[user.uid],
//         updated_user = {
//             [user.uid] : Object.assign(cur_user, {sockets : [...cur_user.sockets, user.socket_id]})
//         };
//     users = Object.assign(users, updated_user);
// };
//
// createUser = (user) => {
//     users = Object.assign({
//         [user.uid] : {
//             username : user.username,
//             uid : user.uid,
//             sockets : [user.socket_id]
//         }
//     }, users);
// };
//
// removeSocket = (socket_id) => {
//     let uid = '';
//     Object.keys(users).map(function(key){
//         let sockets = users[key].sockets;
//         if(sockets.indexOf(socket_id) !== -1){
//             uid = key;
//         }
//     });
//     let user = users[uid];
//     if(user.sockets.length > 1){
//         // Remove socket only
//         let index = user.sockets.indexOf(socket_id);
//         let updated_user = {
//             [uid] : Object.assign(user, {
//                 sockets : user.sockets.slice(0,index).concat(user.sockets.slice(index+1))
//             })
//         };
//         users = Object.assign(users, updated_user);
//     }else{
//         // Remove user by key
//         let clone_users = Object.assign({}, users);
//         delete clone_users[uid];
//         users = clone_users;
//     }
// };
//
// io.on('connection', (socket) => {
//     let query = socket.request._query,
//         user = {
//             username : query.username,
//             uid : query.uid,
//             socket_id : socket.id
//         };
//
//     if(users[user.uid] !== undefined){
//         createSocket(user);
//         socket.emit('updateUsersList', getUsers());
//     }
//     else{
//         createUser(user);
//         io.emit('updateUsersList', getUsers());
//     }
//
//     socket.on('message', (data) => {
//         socket.broadcast.emit('message', {
//             username : data.username,
//             message : data.message,
//             uid : data.uid
//         });
//     });
//
//     socket.on('disconnect', () => {
//         removeSocket(socket.id);
//         io.emit('updateUsersList', getUsers());
//     });
// });


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
require('./server/routes/authenticationRoutes')(app);
require('./server/routes/propRoutes')(app);
require('./server/routes/messageRoutes')(app);
require('./server/routes/paymentRoutes')(app);

app.get('*', (request, response) => response.status(200).send({
	message: 'Welcome to the beginning of Wut.',
}));

module.exports = app;
