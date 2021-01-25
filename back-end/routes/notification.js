const express = require('express');
const router = express.Router();
const notificationControllers = require('../controllers/notification');
const checkAuth = require("../middlewares/check-auth");

router.post('/pushNotification', notificationControllers.pushNotification);
router.put('/getOneNotification/:id', notificationControllers.getOneNotification);
router.get('/getAllNotification', notificationControllers.getAllNotification);
router.put('/editNotification/:id', notificationControllers.editNotification);
router.delete('/deleteOneNotification/:id', checkAuth, notificationControllers.deleteOneNotification);
router.delete('/deleteAllNotification', notificationControllers.deleteAllNotification);

module.exports = router;