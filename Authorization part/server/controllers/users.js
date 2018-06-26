const User = require('../models').user;
const Sequelize = require('sequelize');
const Decrypt = require('../utils/decrypt')
const Encrypt = require('../utils/encrypt')
const jwt = require('jsonwebtoken')

  const create = (req, res) => {
    // User.findOne({
    //     username: req.body.username
    // }).then((dataUser) => {
    //   if(!dataUser){
        Encrypt(req.body.password).then((newPassword) => {
            User.create({
               username: req.body.username,
                firstname: req.body.firstname,
                lastname:req.body.lastname,
                password: newPassword,
                email: req.body.email

            })
                .then(() => {
                    res.status(200).send("susccessfully created")
                })
                .catch((reason) => {
                    res.status(500).send(reason)
                })
        })
    //   }else{
    //     res.status(401).json({
    //       message: "user already exists with the username" + req.body.username + dataUser.username
    //     })
    //   }
    // }).catch((reason) => {
    //     res.send(reason)
    // })
  }


  const userSignin = (req, res) => {
    User.findOne({
        username: req.body.username
    }).then((dataUser) => {
        if (!dataUser) {
            res.status(401).json({
                message: "Authentication failed. User not found"
            })
        } else {
            Decrypt(req.body.password, dataUser.password)
                .then((hasil) => {
                    if (!hasil) {
                        res.status(401).json({
                            message: dataUser.password + "Authentication failed. Password is incorrect" + req.body.password
                        })
                    } else {
                        const payload = {
                            //_id: dataUser._id,
                            username: dataUser.username,
                            email: dataUser.email,
                            isLogin: true
                        }
                        jwt.sign(payload,"0idowekcsnvewf38hubUIBBEJKCwjd", function (err, token) {
                            if (err) {
                                throw err
                            } else {
                                res.send({
                                    message: "Login",
                                    token: token,
                                    data: payload
                                })
                            }
                        })
                    }
                })
                .catch((reason) => {
                    res.send(reason)
                })
        }
    }).catch((reason) => {
        res.send(reason)
    })
}


    /* Find user info */
    // retrieve(req, res) {
    //
    //     return User
    //
    //         .findById(req.params.userid)
    //
    //         .then((user) => {
    //             if(!user) {
    //                 return res.send({
    //                     "code":404,
    //                     "success":"User do not match"
    //                 });
    //             }
    //
    //             return res.send({
    //                 "code":200,
    //                 "success":"user find sucessfull",
    //                 "user":user
    //             });
    //         })
    //
    //         .catch((error) => {return res.send({
    //               "code":404,
    //               "success":"user do not match"
    //         });});
    // },
    //
    //
    // /* Check user and password (used for login) */
    // // check(req, res) {
    // //
    // //     return User
    // //
    // //         .findOne({
    // //             where: {
    // //                 username: req.body.username,
    // //                 password: req.body.password
    // //             }
    // //         })
    // //
    // //         .then((user) => {
    // //
    // //             if(!user) {
    // //                 return res.send({
    // //                     "code":404,
    // //                     "failure":"Username password do not match"
    // //                 });
    // //             }
    // //             return res.send({
    // //                 "code":200,
    // //                 "success":"login sucessfull",
    // //                 "user":user
    // //             });
    // //         })
    // //         .catch((error) => {return res.send({
    // //             "code":404,
    // //             "failure":"Username password do not match"
    // //         });});
    // //   },
    //
    //

    //
    //
    //   /* Modify Password */
    //   updatePwd(req, res) {
    //
    //       return User
    //
    //           .findById(req.params.userid, {
    //           })
    //           .then(user => {
    //               if (!user) {
    //                   return res.status(404).send({
    //                       message: 'user Not Found',
    //                   });
    //               }
    //               return user
    //                   .update({
    //                       password: req.body.password || user.password,
    //                   })
    //                   .then(() => {
    //                       return res.send({
    //                           "code":200,
    //                           "success":"Update sucessfull",
    //                       });
    //                   })
    //                   .catch((error) => {
    //                       return res.send({
    //                           "code":404,
    //                           "success":"Update fail",
    //                       });
    //                   });
    //               })
    //               .catch((error) => {
    //                   return res.send({
    //                       "code":404,
    //                         "success":"Update fail",
    //                   });
    //               });
    //       },


module.exports = {
    create,
    userSignin
    //update
}
