const express = require('express');
const passport = require('passport');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const userController = require('../controllers/users');
require('../config/passport');
// const jwt = require('jsonwebtoken');

router.get('/getAllUsers', userController.getAllUsers);
router.post('/authentication', userController.authentication);
router.post('/userRegister', userController.usersRegister);
router.get('/getOneUser/:id', checkAuth, userController.getOneUsers);
router.get('/getUserBy/:id', userController.getuserByGroup);
router.delete('/deleteUser/:id', checkAuth, userController.deleteUser);
router.post('/drumpUser', userController.drumpUsers);
// router.get('/profile', checkAuth, userController.profile);
// router.put('/verified/:id', userController.verfiedUser);
// router.put('/editPosition/:id', userController.editPositionuser);
// router.put('/approveUser/:id', userController.approveUser);

module.exports = router;

// , passport.authenticate('jwt', { success: false })