const express = require('express');
const router = express.Router();
const notificationControllers = require('../controllers/notification');
const checkAuth = require("../middlewares/check-auth");

router.post('/pushNotification', checkAuth, notificationControllers.pushNotification);
router.get('/getOneNotification/:id', notificationControllers.getOneNotification);
router.get('/getAllNotification', notificationControllers.getAllNotification);
router.put('/editNotification/:id', checkAuth, notificationControllers.editNotification);
router.delete('/deleteOneNotification/:id', checkAuth, notificationControllers.deleteOneNotification);
router.delete('/deleteAllNotification', checkAuth, notificationControllers.deleteAllNotification);

module.exports = router;