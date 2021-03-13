const { json } = require('body-parser');
const HistoriesSubEquipment = require('../models/history-sub-equipment');


exports.getHistoriesEquipment = (req, res, next) => {
    HistoriesSubEquipment.find().then(result => {
        console.log(result);
        res.status(201).json({
            response: result
        })
    }).catch(err => {
        res.status(500).json({
            message: "ไม่สามารถโหลดข้อมูลได้"
        });
    });
}

exports.getHistoriesById = (req, res, next) => {
    const id = req.params.id;

    HistoriesSubEquipment.findById(id).then(result => {
        console.log(result);
        if (!result) {
            res.status(404).json({
                message: "ไม่พวข้อมูล"
            })
        }
        res.status(201).json({
            response: result
        });
    }).catch(err => {
        res.status(500).json({
            message: "ไม่สามารถโหลดข้อมูลได้"
        });
    });
}

exports.addHistoriesEquipment = (req, res, next) => {
    const historiesList = new HistoriesSubEquipment({
        mainId: req.body.mainId,
        mainName: req.body.mainEquipmentsName,
        equipmentName: req.body.subEquipmentName,
        budgetPerPrice: req.body.pricePerunit,
        unit: req.body.number,
        budget: req.body.budget,
        creator: req.userData.userId
    });

    if (!historiesList) {
        res.status(404).json({
            message: "ต้องกรอกข้อมูลก่อนที่จะบันทึกลง"
        });
    }
    historiesList.save().then(result => {
        res.status(201).json({
            response: result
        })
    }).catch(err => {
        escape.status(500).json({
            message: "Server error"
        });
    });
}

exports.deleteHistoriesEquipment = (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        res.status(404).json({
            message: "Can't find id"
        })
    }
    HistoriesSubEquipment.findByIdAndRemove(id).then(result => {
        res.status(201).json({
            message: "Deleted !"
        })
    }).catch(err => {
        res.status(500).json({
            message: "Somthong wrong นาจ๊ะ !"
        })
    })
}