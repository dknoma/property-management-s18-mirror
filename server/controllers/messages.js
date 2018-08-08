const Message = require('../models').Message;
const Inbox = require('../models').Inbox;
const User = require('../models').User;

module.exports = {
    //allows user to create a message
    create(req, res) {
        var currentUser = req.currentUser;
        if(currentUser) {
            User.findById(currentUser)
            .then(user => {
                return Message
                    .create({
                        senderId: req.body.senderId,
                        sender_username: user.username,
                        receiverId: req.body.receiverId,
                        inboxId: req.body.receiverId,
                        subject: req.body.subject,
                        body: req.body.body,
                    })
                    .then(message => {
                        return res.status(201).send(message)
                    })
                    .catch(error => res.status(401).send(error));
            })
            .catch(error => res.status(401).send(error));
        } else {
            return res.status(401).send({message: 'Unable to authenticate.'});
        }
    },
    //allows user to view all their messages
    allMessages(req ,res) {
        //verify if user is owner of inbox trying to view
        var currentUser = req.currentUser;
        if(currentUser) {
            if(req.params.userId == currentUser) {
                return Message
                    .findAll({
                        where: {
                            inboxId: currentUser
                        }
                    })
                    .then(messages => {
                        return res.status(200).send(messages);
                    })
                    .catch(error => res.status(401).send(error));
            } else {
                return res.status(401).send({
                    message: "Unable to authenticate. Please try again.",
                });
            }
		} else {
			return res.status(401).send({message: 'Unable to authenticate.'});
		}
    },
    //alows user to view single message from their inbox
    viewMessage(req, res) {
        var currentUser = req.currentUser;

        if(currentUser) {
            if(req.params.userId == currentUser) {
                return Message
                    .findById(req.params.messageId)
                    .then(message => {
                        if(!message) {
                            return res.status(404).send({
                                message: 'Message Not Found',
                            });
                        }
                        if(!message.viewed) {
                            message.update({viewed: true});
                        }
                        return res.status(200).send(message);
                    })
                    .catch(error => res.status(401).send({
                        message: "Unable to find message.",
                        error
                    }));
            } else {
                return res.status(401).send({
                    message: "Unable to authenticate. Please try again.",
                    error
                });
            }

		} else {
			return res.status(401).send({message: 'Unable to authenticate.'});
		}
    },
    //allows user to delete on of their messages
    delete(req, res) {
        var currentUser = req.currentUser;

        if(currentUser) {
            if(req.params.userId == currentUser) {
                return Message
                    .findById(req.params.messageId)
                    .then(message => {
                        if(!message) {
                            return res.status(404).send({
                                message: 'Message Not Found',
                            });
                        }
                        return message
                            .destroy()
                            .then(() => res.status(200).send({ message: 'Message successfully deleted'}))
                            .catch(error => res.status(400).send(error));
                    })
                    .catch(error => res.status(401).send(error));
            } else {
                return res.status(401).send({
                    message: "Unable to authenticate. Please try again.",
                    error
                });
            }

		} else {
			return res.status(401).send({message: 'Unable to authenticate.'});
		}
    }
}
