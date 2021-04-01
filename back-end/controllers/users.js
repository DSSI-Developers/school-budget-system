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

// Add user in system
exports.addUser = async(req, res, next) => {
    const myPlaintextPassword = req.body.password;
    const saltRounds = 10;
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
                expiresIn: 7200, // 3600
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
                res.status(404).json({
                    message: `Cannot delete user with id=${userId}. Maybe user was not found!`
                });
            } else {
                res.json({
                    message: "Users was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
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
        console.log(imagePath);
    } else {
        const url = req.protocol + "://" + req.get("host");
        imagePath = req.body.avatar;
        console.log(imagePath);
    }

    // Edit part
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;
    // console.log(req.file);
    // console.log(imagePath);
    const user = {
        _id: req.userData.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        position: req.body.position,
        department: req.body.department,
        role: req.body.role,
        avatar: imagePath
    };
    console.log(id);
    console.log('Image path :', imagePath);
    console.log('User :', user);
    return res.status(200).json({
        message: "Success"
    });

    // Users.findOneAndUpdate(id, user, { useFindAndModify: false })
    //     .then((result => {
    //         console.log(result);
    //         res.status(201).json({
    //             message: `Updated data ${result}`,
    //             response: result
    //         });
    //     }))
    //     .catch(err => {
    //         console.log(err);
    //         res.status(401).json({
    //             message: "ไม่สามารถแก้ไขขอมูลได้ " + err
    //         });
    //     });


    // exports.adminEditUserData = () => {
    //         const userId = req.params.id;
    //         const userData = req.body;
    //         console.log();
    //         if (!userId) {
    //             res.status(401).json({
    //                 message: "ไมพบ ID ที่ตรงกัน"
    //             })
    //         }
    //         return res.status(202).send("success", userId, userData);
    //         Users.findByIdAndUpdate(userId, userData, { useFindAndModify: false })
    //             .then(result => {
    //                 res.status(404).json({
    //                     message: "แก้ไขจ้อมูลสำเร็จ"
    //                 })
    //             })
    //             .catch(err => {
    //                 res.status(500).json({
    //                     message: `Error message at ${err}`
    //                 })
    //             })
    //     }
}


// This function edit profile without image avatar
exports.userEditProfile = (req, res, next) => {
    const id = req.params.id;
    const userData = req.body;

    if (!userData || !id) {
        res.status(404).json({
            message: "ไม่มีข้อมูล"
        });
    }
    console.log(id);
    console.log(userData);
    // return res.status(200).send(userData);
    Users.findByIdAndUpdate(id, userData, { useFindAndModify: false })
        .then((result) => {
            res.status(201).json({
                message: "Updated user profile success !",
            });
        }).catch((err) => {
            res.status(500).json({
                message: `มีบางอย่างผิดพลาด : ${err}`
            });
        });
}


exports.changePassword = async(req, res, next) => {
    const id = req.params.id;
    const new_password = req.body.new_password;
    const old_password = req.body.old_password;

    Users.findById(id).then(user => {
        const hash = user.password;
        const myPlaintextPassword = old_password;
        console.log('Hash :', hash);
        console.log('Password ', myPlaintextPassword);
        bcrypt.compare(myPlaintextPassword, hash)
            .then(response => {
                if (response) {
                    const hash = bcrypt.hashSync(new_password, 10);
                    console.log(response);
                    console.log(hash);
                    const userData = {
                        _id: id,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: hash,
                        phone: req.body.phone,
                        position: req.body.position,
                        department: req.body.department,
                        role: req.body.role,
                        avatar: req.body.firstName,
                        permission: false,
                    }
                    Users.findByIdAndUpdate(id, userData, { useFindAndModify: false })
                        .then(() => {
                            res.status(201).json({
                                message: "เปลี่ยนรหัสผ่านเรียบร้อย"
                            });
                        }).catch(err => {
                            res.status(500).json({
                                message: err
                            });
                        })
                } else {
                    res.status(404).json({
                        message: "รหัสผ่านไม่ตรงกันกับรหัสผ่านเดิม"
                    });
                }
            }).catch(err => {
                res.status(500).json({
                    message: "มีบางอย่างผิดพลาด" + " " + err
                });
            });
    });
}