const MainEquipment = require('../models/main-equipments');

/*
    Equipment หลักที่จะมี 
    -> บันทึกโครงการ 
    -> แก้ไขโครงการ
    -> ลบโครงการ 
    -> เเสดงโครงการทั้งหทด
    -> เเสดง 1 โครงการ 
*/

exports.saveProject = async(req, res, next) => {
    // const { firstName, lastName, position, learningGroup, subjectTeach, reason, objective, typeEquipment, learningGroups, majorList, budget, necessary, existEquipment, otherReason, dateProject, condition } = req.body;
    const project = new MainEquipment({
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
        // dateProject: req.body.dateProject,
        condition: req.body.condition
    });
    if (!project) {
        res.status(401).json({
            msg: "Don't have data !"
        });
    }
    project.save(project).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            msg: err.msg || "Some error occurred while creating the Project."
        });
    });
}

exports.editProject = (req, res, next) => {
    console.log(req.params.id)
    console.log(req.body);
    if (!req.body) {
        return res.status(400).send({
            msg: "Data to update connot by empty"
        });
    }

    const id = req.params.id;
    MainEquipment.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, function(err, docs) {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.status(401).send({
                msg: `Updated data ${id}`,
                data: docs
            })
        }
    });
    // .then(data => {
    //     if (!data) {
    //         res.status(404).send({
    //             msg: `Cannot update Project with ${id}. Maybe Project was not found`
    //         });
    //     } else res.status(500).send({
    //         msg: "Error updateing Project eith id = " + id
    //     });
    // });
}

exports.deleteProject = (req, res, next) => {
    const id = req.params.id;
    MainEquipment.findByIdAndRemove(id).then(data => {
        if (!data) {
            res.status(404).send({
                msg: `Connot delete project with = ${id}. Maybe Project was not found! `
            });
        } else {
            res.send({
                msg: "Project was deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({ msg: "Could not delete Project with id" + id });
    });
}

exports.deleteAllProject = (req, res, next) => {
    MainEquipment.deleteMany({}).then(data => {
        res.status(201).send({
            msg: `${data.deleteCount} Project were deleted successfully`
        });
    }).catch(err => {
        res.status(500).send({
            msg: err.msg || "Some error occurred while removeing all Project"
        })
    });
}

exports.getAllProject = (req, res, next) => {

    // const allProject = req.body;
    MainEquipment.find({}).then((data) => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            msg: err.msg || "Some error occurred while retrieving data."
        });
    });
    MainEquipment.close();
}

exports.getOneProject = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    MainEquipment.findById(id).then((data) => {
        if (!data) {
            res.status(404).send({ msg: "Not found Project with id " + id });
        } else res.send(data);
    }).catch(err => {
        res.status(500).json({ msg: "Error retriving Project with id =" + id });
    });
}