const express = require('express');
const router = express.Router();
const historyController = require('../controllers/history');
const checkAuth = require("../middlewares/check-auth");

router.get('/history', historyController.getHistory);
router.get('/history/:id', historyController.getOneHistory);
router.post('/history', checkAuth, historyController.addHistory);
router.delete('/history/:id', checkAuth, historyController.deleteHistory);
router.delete('/history', checkAuth, historyController.deleteAllHistory);

module.exports = router;