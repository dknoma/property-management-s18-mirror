const User = require('../models').User;

module.exports = (app, server) => {
    const io = require('socket.io')(server);
    let users = {};

    getUsers = () => {
        return Object.keys(users).map(function(key){
            return users[key].username
        });
    };

    createSocket = (user) => {
        let cur_user = users[user.uid],
            updated_user = {
                [user.uid] : Object.assign(cur_user, {sockets : [...cur_user.sockets, user.socket_id]})
            };
        users = Object.assign(users, updated_user);
    };

    createUser = (user) => {
        users = Object.assign({
            [user.uid] : {
                username : user.username,
                uid : user.uid,
                sockets : [user.socket_id]
            }
        }, users);
    };

    removeSocket = (socket_id) => {
        let uid = '';
        Object.keys(users).map(function(key){
            let sockets = users[key].sockets;
            if(sockets.indexOf(socket_id) !== -1){
                uid = key;
            }
        });
        let user = users[uid];
        if(user.sockets.length > 1){
            // Remove socket only
            let index = user.sockets.indexOf(socket_id);
            let updated_user = {
                [uid] : Object.assign(user, {
                    sockets : user.sockets.slice(0,index).concat(user.sockets.slice(index+1))
                })
            };
            users = Object.assign(users, updated_user);
        }else{
            // Remove user by key
            let clone_users = Object.assign({}, users);
            delete clone_users[uid];
            users = clone_users;
        }
    };

    io.on('connection', (socket) => {
        let query = socket.request._query,
            user = {
                username : query.username,
                uid : query.uid,
                socket_id : socket.id
            };

        if(users[user.uid] !== undefined){
            createSocket(user);
            socket.emit('updateUsersList', getUsers());
        } else {
            createUser(user);
            io.emit('updateUsersList', getUsers());
        }

        socket.on('message', (data) => {
            socket.broadcast.emit('message', {
                username : data.username,
                message : data.message,
                uid : data.uid
            });
        });

        socket.on('disconnect', () => {
            removeSocket(socket.id);
            io.emit('updateUsersList', getUsers());
        });
    });

//     app.get('/chat/pm/:senderId/:receiverId', (req, res, io) => {
//         io.sockets.on('connection', (socket) => {
//             socket.on('join', data => {
//                 socket.join(data.senderId + '+' + data.receiverId);
//             })
//             User.findById(req.params.receiverId)
//             .then(user => {
//                 let query = socket.request._query,
//                 // receiver = users[user.id];
//                 receiver = {
//                     username : user.username,
//                     uid : user.id,
//                     socket_id : socket.id
//                 };
//
//                 if(users[user.uid] !== undefined){
//                     createSocket(receiver);
//                     socket.emit('updateUsersList', getUsers());
//                 } else {
//                     createUser(receiver);
//                     io.emit('updateUsersList', getUsers());
//                     // newChat.to(`${receiver.socket_Id}`).emit('updateUsersList', getUsers());
//                 }
//
//
//                 socket.on('message', (data) => {
//                     socket.broadcast.emit('message', {
//                         username : data.username,
//                         message : data.message,
//                         uid : data.uid
//                     });
//                 });
//
//                 socket.on('disconnect', () => {
//                     removeSocket(socket.id);
//                     io.emit('updateUsersList', getUsers());
//                 });
//             })
// 			.catch(error => res.status(400).send(error));
//         });
//     });
// }

    app.get('/chat/:senderId', (req, res, io) => {
      socket.on('subscribe', function(room) {
          console.log('joining room', room);
          socket.join(room);
      });
      socket.on('send message', function(data) {
          console.log('sending room post', data.room);
          socket.broadcast.to(data.room).emit('send message', {
              message: data.message
          });
      });
    });
  }
