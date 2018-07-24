const Message = require('../models').Message;
const Inbox = require('../models').Inbox;
const config = require('./config');
const jwt = require('jsonwebtoken');

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
        // console.log(req.header('token'));
        try {
            //verify if can update a profile by checking if has valid token
            var currentUser = jwt.verify(req.header('token'), config.secret);
            console.log(currentUser.userId);

            if(req.params.userId == currentUser.userId) {
                return Message
                    .findAll({
                        where: {
                            inboxId: currentUser.userId
                        }
                    })
                    .then(messages => {
                        return res.status(200).send(messages);
                    })
                    .catch(error => res.status(401).send(error));
            } else {
                return res.status(401).send({
                    message: "Unable to authenticate. Please try again.",
                    error
                });
            }
        } catch (error) {
            return res.status(401).send({
                message: "Unable to authenticate. Please try again.",
                error
            });
        }
    }
}