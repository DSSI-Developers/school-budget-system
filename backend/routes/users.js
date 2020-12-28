const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
    let newUser = new User({
        firstName: req.body.firstName,
        lasName: req.body.lastname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        position: req.body.position,
        role: req.body.role
    });

    User.addUser(newUser, (err, user) => {
        if (err) {
            res.json({ success: false, msg: 'Failed to register user' });
        } else {
            res.json({ success: false, msg: 'User register' });
        }
    });
});

// Authentication
router.post('/authentication', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.getUserByEmail(email, (err, user) => {
        if (err) throw err;
        if (!user) {
            return res.json({ success: false, msg: "User not found" });
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({ data: user }, config.secret, {
                    expiresIn: 604800 // 1 week
                });

                res.json({
                    success: true,
                    token: 'JWT' + token,
                    user: {
                        id: user.id,
                        firstNamne: user.firstName,
                        lastNamne: user.lstName,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, msg: "Wrong password" });
            }
        });
    })
});


// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({
        user: {
            _id: req.user._id,
            firstName: req.user.firstName,
            lastName: req.body.lastName,
            email: req.user.email,
        }
    });
});

// Validate 
router.get('/validate', (req, res, next) => {
    res.send('Validate');
});


module.exports = router;