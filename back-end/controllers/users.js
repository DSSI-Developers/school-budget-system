const Users = require('../models/users.model')
const usersMockup = require('../mockup-data/usersMockup.json');
const { randomString } = require("../helpers/common");
const { validationResult } = require("express-validator");

const fs = require('fs');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');
const { success, error, validation } = require('../helpers/responseApi');
const { has } = require('config');
const jwt = require('jsonwebtoken');
const { RSA_NO_PADDING } = require('constants');
const express = require('express');
const { token } = require('morgan');
const config = require('../config/database');
// const dotenv = require('dotenv');
// dotenv.config();
/*
    Users 
    -> Register
    -> Login
    -> Get All users
    -> Get one user
    -> Get users by laerning group 
    -> Delete user
    -> Edit position user 
    -> Approve users permission
*/

// User register
exports.usersRegister = async(req, res, next) => {
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hash = bcrypt.hashSync(myPlaintextPassword, salt);
    // res.send(hash);
    const newUser = new Users({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        position: req.body.position,
        department: req.body.department,
        role: req.body.role,
        avatar: req.body.role,
        permission: req.body.permission,
    });

    Users.addUser(newUser, (err, user) => {
        if (err) {
            res.json({
                success: false,
                msg: 'Failed to register user'
            });
        } else {
            res.json({ success: 'true', msg: 'User register' });
        }
    });

}


// User login
exports.authentication = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Users.getUserByUsername(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.json({ success: false, msg: 'user not found' });
        }
        Users.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 }); // Expires in 1 week
                // const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 }); // Expires in 1 week
                res.json({
                    success: true,
                    token: 'bearer ' + token,
                    user: {
                        id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        // password: user.password,
                        phone: user.phone,
                        position: user.position,
                        department: user.department,
                        role: user.role,
                        avatar: user.avatar,
                        permission: user.permission,
                    }
                });
                req.header('auth-token');
            } else {
                return res.json({ success: false, msg: 'Wrong Password' });
            }
        });
    });
}

exports.profile = (req, res, next) => {
    res.json({
        user: req.user
    })
}

// Get all user
exports.getAllUsers = (req, res) => {
    Users.find({}).then((data) => {
        const users = data;
        res.status(201).json({
            success: true,
            msg: data
        });
    }).catch((err) => {
        res.status(404).json({
            success: false,
            mag: err
        });
    });
}

// Retrieve  one user 
exports.getOneUsers = (req, res) => {
    const id = req.params.id;
    Users.findById(id, callback);
}

exports.getuserByusername = (req, res, next) => {
    const query = { usernamr: username }
    Users.findOne(query, callback);
}

// Get users by laerning group 
// exports.getuserByGroup = (req, res, next) => {

// }

// Delete one user
// exports.deletelUser = (req, res) => {
//     const userId = req.body.id;
//     Users.findByIdAndRemove(id)
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot delete user with id=${userId}. Maybe user was not found!`
//                 });
//             } else {
//                 res.send({
//                     message: "Users was deleted successfully!"
//                 });
//             }
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Could not delete User with id=" + userId
//             });
//         });
// }

// Delete all user
// exports.deleteAllUser = (req, res) => {
//     Users.deleteMany({})
//         .then(data => {
//             res.send({
//                 message: `${data.deletedCount} Tutorials were deleted successfully!`
//             });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: err.message || "Some error occurred while removing all tutorials."
//             });
//         });
// }


// Edit position user 
// exports.editPositionuser = () => {
//     if (!req.body) {
//         return res.status(400).send({
//             message: "Data to update can not be empty!"
//         });
//     }

//     const id = req.params.id;

//     Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//         .then(data => {
//             if (!data) {
//                 res.status(404).send({
//                     message: `Cannot update User with id=${id}. Maybe User was not found!`
//                 });
//             } else res.send({ message: "Tutorial was updated successfully." });
//         })
//         .catch(err => {
//             res.status(500).send({
//                 message: "Error updating Tutorial with id=" + id
//             });
//         });
// }

// Approve users permission
// exports.approveUser = (req, res, next) => {

// }