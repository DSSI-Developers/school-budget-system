const SubEquipmentList = require('../models/sub-equipment-list');

exports.addList = (req, res, next) => {
    const listData = new SubEquipmentList({
        titleMainList: req.body.mainlist,
        idMainList: req.body.idMain,
        listData: req.body.list
    });
    // Test loging data
    // console.log(listData);
    // return res.status(201).json({
    //     message: listData
    // });

    // Insert data 
    listData.save()
        .then((result) => {
            res.status(201).json({
                message: "API post is work",
                response: result
            })
        }).catch(err => {
            res.status(401).json({
                message: "API post doesn't work"
            })
        });
}

exports.getList = (req, res, next) => {
    SubEquipmentList.find()
        .then((result) => {
            res.status(201).json({
                message: "Get data success",
                response: result
            })
        }).catch(err => {
            res.status(401).json({
                message: err + "API post doesn't work"
            })
        });
}


exports.getListByName = (req, res, next) => {
    const main_name = req.params.main;
    console.log(main_name);
    SubEquipmentList.findOne({ titleMainList: main_name })
        .then((result) => {
            if (!result) {
                return res.status(404).json({
                    message: "ไม่มีข้อมูล"
                });
            }
            res.status(201).json({
                message: "Get data success",
                response: result
            })
        }).catch(err => {
            res.status(401).json({
                message: err + "ไม่สามารถทำงานได้"
            })
        });
}