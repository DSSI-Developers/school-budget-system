const express = require('express');
const { route } = require('./users');
const router = express.Router();
const learnGpController = require('../controllers/learningGroup');

/*
    Learning Group router
    -> Get Learning Group
    -> Add Learning Group
    -> Edit Learning  Group
    -> Delete Learning Group
*/

router.get('/getLeaning', learnGpController.getLearningGroup);
router.get('/getOneLeaning/:id', learnGpController.getOneLearing);
router.post('/addLearning', learnGpController.addLearningGroup);
router.put('/editLearning/:id', learnGpController.editLearningGroup);
router.delete('/deleteLearning/:id', learnGpController.deleteLearningGroup);

module.exports = router;