const express = require('express');
const passport = require('passport');
const router = express.Router();
const jwt = require('jsonwebtoken');
const userController = require('../controllers/users');
require('../config/passport');

router.get('/getAllUsers', userController.getAllUsers);
router.post('/authentication', userController.authentication);
router.post('/userRegister', userController.usersRegister);
router.get('/getOneUser/:id', userController.getOneUsers);
router.get('/profile', passport.authenticate('jwt', { session: false }), userController.profile);
router.get('/getUserBy/:id', userController.getuserByGroup);
router.put('/verified/:id', userController.verfiedUser);
router.delete('/deleteUser/:id', userController.deleteUser);
// router.put('/editPosition/:id', userController.editPositionuser);
// router.put('/approveUser/:id', userController.approveUser);

module.exports = router;

// , passport.authenticate('jwt', { success: false })