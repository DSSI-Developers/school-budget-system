const SetBudget = require('../models/set-budget-leader');

exports.setbudget = (req, res, next) => {
    const { budget, learningGroup, date } = req.body;
    // console.log(budget);
    // console.log(learningGroup);
    // console.log(creator);
    if (!req.body) {
        console.log("Don't have data in req.body");
        res.status(404).json({
            message: "ไม่พบข้อมูล"
        });
    }

    const dataBudget = new SetBudget({
        budget: budget,
        date: date,
        learningGroup: learningGroup,
        creator: req.userData.userId
    });
    dataBudget.save().then((result) => {
        res.status(201).json({
            message: "Successful !" + result
        });
    }).catch((err) => {
        res.status(505).json({
            message: "Fail to save data!" + err
        });
    });
}

exports.getBudget = (req, res, next) => {
    SetBudget.find().then(response => {
        res.status(201).json({
            data: response
        });
    }).catch(err => {
        res.status(500).json({
            message: "ไม่สามารถโหลดข้อมูลได้"
        });
    });
}

exports.editbudget = (req, res, next) => {
    const id = req.params.id;
    // const budget = req.body.budget;
    // const learningGroup = req.body.learningGroup;
    // const date = req.body.date;
    // const creator = req.userData.userId;
    // const dataBudget = new SetBudget({
    //     budget: budget,
    //     learningGroup: learningGroup,
    //     date: date,
    //     creator: req.userData.userId
    // });
    if (!req.body) {
        res.status(404).json({
            message: "ไม่พบข้อมูล"
        });
    }
    console.log(id);
    // return res.status(202).send(req.body);
    SetBudget.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(response => {
        console.log(response);
        res.status(201).json({
            message: "แก้ไขข้อมูลสำเร็จ"
        });
    }).catch(err => {
        console.log(err);
        res.status(505).json({
            message: "แก้ไขข้อมูลไม่สำเร็จ"
        });
    });
}

exports.deletebudget = (req, res, next) => {
    const id = req.params.id;
    console.log(id);
    SetBudget.findByIdAndDelete(id).then(response => {
        res.status(201).json({
            message: "ลบข้อมูลสำเร็จ"
        });
    }).catch(err => {
        res.status(505).json({
            message: "ไม่สามารถลบข้อมูลได้"
        });
    })
}