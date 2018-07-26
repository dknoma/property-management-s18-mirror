const Message = require('../models').Message;
const Inbox = require('../models').Inbox;
const config = require('./config');
const jwt = require('jsonwebtoken');
const authorizor = require('../middleware/auth-check')

module.exports = {
    list(req, res) {
        return Inbox
            .findAll({
                where: {
                    userId: req.params.userId
                }
            })
            .then(inboxes => {
                return res.status(201).send(inboxes)
            })
            .catch(error => res.status(400).send(error));
    },
    create(req, res) {
        return Message
            .create({
                senderId: req.body.senderId,
                receiverId: req.body.receiverId,
                inboxId: req.body.receiverId,
                subject: req.body.subject,
                body: req.body.body,
            })
            .then(message => {
                return res.status(201).send(message)
            })
            .catch(error => res.status(401).send(error));
    },
    listM(req, res) {
        return Message
        .findAll()
        .then(messages => {
            return res.status(200).send(messages);
        })
        .catch(error => res.status(401).send(error));
    },
    allMessages(req ,res) {
        //verify if user is owner of inbox trying to view
        var currentUser = req.currentUser;
        console.log('WORKING? ' + currentUser);

        if(req.params.userId == currentUser) {
            console.log('ids match');
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
    },
    delete(req, res) {
        var currentUser = req.currentUser;
        
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
                        //status(204).send()) : 204 No Content
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
    }
}