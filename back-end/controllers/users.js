const Users = require('../models/users.model')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// const jwt = require("jsonwebtoken");
// const fs = require('fs');
// const { json } = require('body-parser');
// const { success, error, validation } = require('../helpers/responseApi');
// const { has } = require('config');
// const { RSA_NO_PADDING } = require('constants');
// const { token } = require('morgan');
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
    bcrypt.hash(req.body.password, 10).then(hash => {
        const user = new Users({

            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            phone: req.body.phone,
            position: req.body.position,
            department: req.body.department,
            role: req.body.role,
            avatar: req.body.role,
            permission: req.body.permission,
        });
        user
            .save()
            .then(result => {
                res.status(201).json({
                    message: "User created!",
                    result: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
    });
}


// User login
exports.authentication = async(req, res, next) => {
    let fetchedUser;
    await Users.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: "ไม่พบผู้ใช้งาน"
                });
            }
            fetchedUser = user;
            return bcrypt.compareSync(req.body.password, user.password);
        })
        .then(result => {
            if (!result) {
                return res.status(401).json({
                    message: "รหัสผ่านหรือชื่อผู้ใช้งานไม่ถุกต้อง"
                });
            }
            const token = jwt.sign({ email: fetchedUser.email, userId: fetchedUser._id },
                "secret_this_should_be_longer", { expiresIn: "2h" } // Old 1h
            );
            res.status(200).json({
                token: token,
                expiresIn: 3600,
                userId: fetchedUser._id
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: "Invalid authentication credentials!"
            });
        });

    // const email = req.body.email;
    // const password = req.body.password;
    // Users.getUserByUsername(email, (err, user) => {
    //     if (err) throw err;
    //     if (!user) {
    //         res.json({ success: false, msg: 'user not found' });
    //     }
    //     Users.comparePassword(password, user.password, (err, isMatch) => {
    //         if (err) throw err;
    //         if (isMatch) {
    //             const token = jwt.sign(user.toJSON(), config.secret, { expiresIn: 604800 }); // Expires in 1 week
    //             res.json({
    //                 success: true,
    //                 token: 'bearer ' + token,
    //                 user: {
    //                     id: user._id,
    //                     firstName: user.firstName,
    //                     lastName: user.lastName,
    //                     email: user.email,
    //                     // password: user.password,
    //                     phone: user.phone,
    //                     position: user.position,
    //                     department: user.department,
    //                     role: user.role,
    //                     avatar: user.avatar,
    //                     permission: user.permission,
    //                 }
    //             });
    //             req.header('auth-token');
    //         } else {
    //             return res.json({ success: false, msg: 'Wrong Password' });
    //         }
    //     });
    // });
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
            message: true,
            users: data
        });
    }).catch((err) => {
        res.status(404).json({
            message: "Get users failed",
            status: err
        });
    });
}

// Retrieve  one user 
exports.getOneUsers = (req, res) => {
    const id = req.params.id;
    // Users.findById(id, callback);
    Users.findById(id).then(data => {
        res.status(201).json({
            message: "Get data successful",
            data: data
        })
    }).catch((err) => {
        res.status(404).json({
            message: err || "Data not found",
            data: err || "Don't have data!"
        });
    });

}

exports.getuserByusername = (req, res, next) => {
    const query = { usernamr: username }
    Users.findOne(query, callback);
}

// Get users by laerning group 
exports.getuserByGroup = (req, res, next) => {

}

// Delete one user
exports.deleteUser = (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    Users.findByIdAndRemove(userId)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete user with id=${userId}. Maybe user was not found!`
                });
            } else {
                res.send({
                    message: "Users was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete User with id=" + userId
            });
        });
}

// Verified User 
exports.verfiedUser = (req, res, next) => {
    const id = req.params.id;
    Users.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, (err, result) => {
        if (err) {
            res.status(500).json({
                message: "Cannot update data !",
                result: err
            });
        } else {
            res.status(201).json({
                message: "Update data successfully",
                result: result
            });
        }
    });
}

// Delete all user
exports.deleteAllUser = (req, res) => {
    Users.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Tutorials were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while removing all tutorials."
            });
        });
}


// const UserTest = require('../models/userTest');
// const fs = require('fs');

// exports.drumpUsers = (req, res, next) => {
//     res.status(201).json({
//         message: "Drump user work"
//     });
// }

// Edit position user 
exports.editProfile = (req, res, next) => {
    // const url = req.protocol + "://" + req.get("host");
    let imagePath = req.body.imagePath;
    console.log('File : ', req.file);
    if (req.file) {
        const url = req.protocol + "://" + req.get("host");
        imagePath = url + "/images/" + req.file.filename;
    }

    // Edit part
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    console.log(req.file);
    console.log(imagePath);
    const user = {
        id: id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        department: req.body.department,
        role: req.body.role,
        avatar: imagePath
    };
    // avatar: url + "/images/" + req.file.filename

    // console.log(id);
    console.log('Image path :', imagePath);
    console.log('User :', user);
    // return res.status(200).json({
    //     message: "Success"
    // });

    Users.findOneAndUpdate(id, user, { useFindAndModify: false })
        .then((result => {
            console.log(result);
            res.status(201).json({
                message: `Updated data ${result}`,
                response: result
            });
        }))
        .catch(err => {
            console.log(err);
            res.status(401).json({
                message: "ไม่สามารถแก้ไขขอมูลได้ " + err
            });
        });
    // .then(result => {
    //     res.status(200).json({
    //         message: "Update successful!",
    //         response: result
    //     });
    //     // if (result.n > 0) {
    //     // } else {
    //     //     res.status(401).json({ message: "Not authorized!" });
    //     // }
    // })
    // .catch(error => {
    //     console.log(error);
    //     res.status(500).json({
    //         message: error
    //     });
    // });

    // Users.findByIdAndUpdate(id, user, { useFindAndModify: false })
    //     .then(data => {
    //         if (!data) {
    //             res.status(404).json({
    //                 message: `Cannot update User with id=${id}. Maybe User was not found!`
    //             });
    //         } else res.json({ message: "Tutorial was updated successfully." });
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             message: "Error updating user detail with id=" + id,
    //             response: err
    //         });
    //     });
}





// Approve users permission
// exports.approveUser = (req, res, next) => {

// }