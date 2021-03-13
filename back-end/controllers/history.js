const { Result } = require('express-validator');
const Histories = require('../models/history');

exports.addHistory = (req, res, next) => {
    const history = new Histories({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        position: req.body.position,
        learningGroup: req.body.learningGroup,
        subjectTeach: req.body.subjectTeach,
        reason: req.body.reason,
        objective: req.body.objective,
        typeEquipments: req.body.typeEquipment,
        learningGroups: req.body.learningGroups,
        majorList: req.body.majorList,
        budget: req.body.budget,
        necessary: req.body.necessary,
        existEquipment: req.body.existEquipment,
        otherReason: req.body.otherReason,
        dateProject: req.body.dateProject,
        condition: req.body.condition,
        status: req.body.status,
        approveCondition: req.body.approveCondition,
        approveReason: req.body.approveReason,
        creator: req.body.creator,
        listSubEquipment: req.body.listSubEquipment
    });

    if (!history) {
        res.status(401).json({
            message: "ไม่พบข้อมูล"
        });
    }
    console.log(history);
    // return res.status(201).json({
    //     message: history
    // });
    history.save()
        .then(result => {
            res.status(201).json({
                message: "บันทุกข้อมูลประวัติเรียบร้อยแล้ว"
            })
        })
        .catch(err => {
            res.status(500).json({
                message: `ไม่สามารถเพิ่มข้อมูลประวัติได้ เนื่องจาก : ${err}`
            });
        });
}

exports.getHistory = (req, res, next) => {
    Histories.find()
        .then(result => {
            res.status(201).json({
                message: "ข้อมูลทั้งหมด",
                response: result
            })
        }).catch(err => {
            res.status().json({
                message: `ไม่พบข้อมูล เนื่องจาก : ${err}`
            })
        });

}

exports.getOneHistory = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({
            message: "Can't find id"
        })
    }
    Histories.findById().then((result) => {
        res.status(201).json({
            message: "Retreive data success",
            response: result
        });
    }).catch(err => {
        res.status(500).json(err)
    });
}

exports.getHistoryById = (req, res, next) => {
    const id = req.params.id;
    Histories.findOne(id)
        .then(result => {
            res.status(201).json({
                message: "ข้อมูลทั้งหมด",
                response: result
            })
        }).catch(err => {
            res.status().json({
                message: `ไม่พบข้อมูล เนื่องจาก : ${err}`
            })
        });
}

exports.deleteHistory = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status().json({
            message: "ไม่พบ ID"
        });
    }
    Histories.deleteOne(id)
        .then(() => {
            res.status(401).json({
                message: "ลบข้อมูลสำเร็จ",
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `ไม่สามารถลบข้มมูลได้ เนื่องจาก : ${err}`
            })
        });
}

exports.deleteAllHistory = (req, res, next) => {
    Histories.deleteMany()
        .then(() => {
            res.status(401).json({
                message: "ลบข้อมูลสำเร็จ",
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `ไม่สามารถลบข้มมูลได้ เนื่องจาก : `
            })
        })
}