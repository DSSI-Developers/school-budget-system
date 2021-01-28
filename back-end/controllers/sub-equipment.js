const { response } = require('express');
const SubEquipments = require('../models/sub-equipment');

/*
    Sub Equipment
    -> Add Sub Equiment
    -> Edit Sub Equiment
    -> Delete SubEquipment 
    -> Get all data sub equipment
    -> Get one data sub equipment  => Relation with Main equipment
*/

exports.addsubEquipment = (req, res, next) => {
    // const { mainId, mainEquipmentsName, subEquipmentName, pricePerunit, number, budget } = req.body;
    const subEquipment = new SubEquipments({
        mainId: req.body.mainId,
        mainName: req.body.mainEquipmentsName,
        equipmentName: req.body.subEquipmentName,
        budgetPerPrice: req.body.pricePerunit,
        unit: req.body.number,
        budget: req.body.budget,
        creator: req.userData.userId
    });
    // console.log(subEquipment);
    // console.log(req.userData.userId);
    // return res.status(201).json({})
    subEquipment.save().then((data) => {
        res.status(201).json({
            message: "OK Google !",
            response: data
        });
    }).catch(err => {
        res.status(401).json({
            message: err.msg || "Some error occurred while create the Notification",
            response: err
        });
    });

}

exports.editSubEquipment = (req, res, next) => {

}
exports.deleteSubEquiment = (req, res, next) => {
    const subEquipmentId = req.params.id;
    SubEquipments.findByIdAndDelete(subEquipmentId).then(result => {
        res.status(201).json({
            message: "Delete data subequipment successful!",
            response: result
        })
    }).catch(err => {
        message: "Can't remove data sub equipment" + err
    });
}
exports.getAllSub = (req, res, next) => {
    SubEquipments.find({}).then((data) => {
        res.status(201).json({
            message: "Read data successful",
            response: response
        })
    }).catch(err => {
        res.status(401).json({
            message: "Failed to retieve data !",
            response: err
        })
    })
}
exports.getOneSub = (req, res, next) => {
    const id = req.params.id;
    SubEquipments.find(id).then(data => {
        res.status(201).json({
            message: "Read data successful",
            response: response
        })
    }).catch(err => {
        res.status(201).json({
            message: "Read data successful",
            response: response
        })
    });
}

exports.getMainSubEquipment = (req, res, next) => {
    const mainId = req.params.id;
    console.log('Function find data in sub :', mainId);
    // return res.status(200).json({});
    SubEquipments.find({ mainId: mainId }).then(data => {
        res.status(201).json({
            message: 'Load data successful',
            response: data
        });
    }).catch(err => {
        res.status(401).json({
            message: "Can't load data from datbase",
            response: err
        });
    });
}