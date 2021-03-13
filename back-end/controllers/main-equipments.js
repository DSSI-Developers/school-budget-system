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
        dateProject: req.body.dateProject,
        condition: req.body.condition,
        status: req.body.status,
        approveCondition: req.body.approveCondition,
        approveReason: req.body.approveReason,
        userId: req.userData.userId,
        creator: req.userData.userId
    });
    if (!project) {
        res.status(401).json({
            message: "ไม่พบข้อมูล กรุณากรอกข้อมูล !"
        });
    }
    // console.log(req.userData);
    // return res.status(200).json({});
    project.save(project).then(data => {
        res.status(201).send({ data: data });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Project."
        });
    });
}

exports.editProject = (req, res, next) => {
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
        dateProject: req.body.dateProject,
        condition: req.body.condition,
        status: req.body.status,
        approveCondition: req.body.approveCondition,
        approveReason: req.body.approveReason,
        creator: req.userData.userId
    });
    if (!req.body) {
        return res.status(400).send({
            message: "Data to update connot by empty"
        });
    }
    // , function(err, docs) {
    //     if (err) {
    //         console.log(err);
    //         res.status(401).json({
    //             message: "ไม่สามารถแก้ไขขอมูลได้ " + err
    //         });
    //         throw err;
    //     } else {
    //         console.log('Successful');
    //         res.end();
    //         res.status(201).json({
    //             message: `Updated data ${id}`,
    //             data: docs
    //         })
    //     }
    // }
    const id = req.params.id;
    console.log(id);
    // return res.status(201).json({
    //     message: "Success"
    // });
    MainEquipment.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then((result => {
            console.log(result);
            res.status(201).json({
                message: `Updated data ${result}`,
            });
        }))
        .catch(err => {
            console.log(err);
            res.status(401).json({
                message: "ไม่สามารถแก้ไขขอมูลได้ " + err
            });
        });
}

exports.deleteProject = (req, res, next) => {
    const id = req.params.id;
    MainEquipment.deleteOne({ _id: req.params.id }).then(data => {
        if (!data) {
            res.status(404).send({
                message: `Connot delete project with = ${id}. Maybe Project was not found! `
            });
        } else {
            res.send({
                message: "Project was deleted successfully!"
            });
        }
    }).catch(err => {
        res.status(500).send({ message: "Could not delete Project with id" + id });
    });
}

// Post.deleteOne({ _id: req.params.id }).then(result => {
//     console.log(result);
//     res.status(200).json({
//         message: "Post deleted!"
//     });
// });

exports.deleteAllProject = (req, res, next) => {
    MainEquipment.deleteMany({}).then(data => {
        res.status(201).send({
            message: `${data.deleteCount} Project were deleted successfully`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removeing all Project"
        })
    });
}

exports.getAllProject = (req, res, next) => {
    // const allProject = req.body;
    const sortProject = { dateProject: -1 }
    MainEquipment.find({}).sort(sortProject).then((data) => {
        res.status(201).json({
            message: 'All data',
            data: data
        });
    }).catch(err => {
        res.status(500).json({
            message: "Some error occurred while retrieving data." + err
        });
    });
}

exports.getEquipment = (req, res, next) => {
    const pageSize = +req.query.pagesize;
    const currentPage = +req.query.page;
    const equipmentQuery = MainEquipment.find();
    let fetchedPosts;

    if (pageSize && currentPage) {
        equipmentQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
    }
    equipmentQuery
        .then(documents => {
            fetchedPosts = documents;
            return MainEquipment.count();
        })
        .then(count => {
            res.status(200).json({
                message: "Posts fetched successfully!",
                posts: fetchedPosts,
                maxPosts: count
            });
        })
        .catch(error => {
            res.status(500).json({
                message: "Fetching posts failed!"
            });
        });
};

exports.getOneProject = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    MainEquipment.findById(id).then((data) => {
        if (!data) {
            res.status(404).json({
                message: "ไม่พบข้อมูล" + id
            });
        } else res.status(201).json({
            message: data,
            response: data
        });
    }).catch(err => {
        res.status(500).json({ message: "Error retriving Project with id =" + id });
    });
}

exports.findByType = (req, res, next) => {
    const name = req.body.name;
    console.log(name);
    res.end(name);
}