const LearningGroups = require('../models/learningGroup');

exports.getLearningGroup = (req, res, next) => {
    LearningGroups.find({}).then(data => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).json({
            msg: err.msg || "Error connot read data from database"
        });
    });

}

exports.getOneLearing = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({
            message: "ไม่พบข้อมูลนี้"
        });
    }
    LearningGroups.findById(id).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send(err)
    });
}

exports.addLearningGroup = (req, res, next) => {
    const learningGp = new LearningGroups({
        learning_group_name: req.body.learningGroup
    });
    if (!learningGp) {
        res.send("ไม่มีข้อมูล");
    }
    console.log(learningGp);

    learningGp.save(learningGp).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            msg: err
        });
    });
}


exports.editLearningGroup = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(400).send(`Cannot find id=${id}`);
    }
    if (!req.body) {
        res.status(400).send(`Cannot find detail =${learningGroup}`);
    }
    LearningGroups.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, function(err, result) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.status(201).send({
                msg: `Updated data ${result}`,
                data: result
            });
        }
    });
}

exports.deleteLearningGroup = (req, res, next) => {
    const id = req.params.id;
    LearningGroups.findByIdAndRemove(id).then(data => {
        res.status(200).send({
            msg: `Remove successful`
        });
    }).catch(err => {
        res.status(500).send({
            msg: `Connot remove this learning`
        });
    });
}