const express = require('express');
const passport = require('passport');
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const userController = require('../controllers/users');
const extractFile = require('../middlewares/file');
require('../config/passport');
// const jwt = require('jsonwebtoken');


router.get('/getAllUsers', userController.getAllUsers);
router.post('/authentication', userController.authentication);
router.post('/userRegister', extractFile, userController.usersRegister);
router.get('/getOneUser/:id', checkAuth, userController.getOneUsers);
router.get('/getUserBy/:id', userController.getuserByGroup);
router.delete('/deleteUser/:id', checkAuth, userController.deleteUser);
// router.post('/drumpUser', userController.drumpUsers);
// router.get('/profile', checkAuth, userController.profile);
// router.put('/verified/:id', userController.verfiedUser);
router.put('/editProfile/:id', checkAuth, extractFile, userController.editProfile);
router.post('/addUser', extractFile, userController.addUser);
// router.put('/adminEditUser/:id', checkAuth, extractFile, userController.adminEditUserData);
router.put('/userEditProfile/:id', userController.userEditProfile);
router.put('/editPassword/:id', userController.changePassword);



module.exports = router;

// , passport.authenticate('jwt', { success: false })