const LearningGroups = require('../models/learningGroup');

exports.getLearningGroup = (req, res, next) => {
    res.status(200).send({
        msg: "Router get learning group work !"
    });

    console.log(`Learning group router working...`)
}

exports.getOneLearing = (req, res, next) => {
    res.status(200).send({
        msg: "Router get one learing group work"
    });
}

exports.addLearningGroup = (req, res, next) => {
    res.status(200).send({
        msg: "Router add learning group work"
    });
}


exports.editLearningGroup = (req, res, next) => {
    res.send({
        msg: "Router edit learning group work"
    });
}

exports.deleteLearningGroup = (req, res, next) => {
    res.send(`Router delete work`);
}