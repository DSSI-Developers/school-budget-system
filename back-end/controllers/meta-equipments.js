// Controlller
const { Result } = require('express-validator');
const TypeEquipments = require('../models/meta-equipments');
/*
    Metadata 
    -> Get metadata
    -> Add metadata
    -> Edit metadata
    -> Delete metadata
*/
exports.getMetadata = (req, res, next) => {
    TypeEquipments.find({}).then(data => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).json({
            msg: err.msg || "Error connot read data from database"
        });
    });
}

exports.addMetadata = (req, res, next) => {
    const metadata = new TypeEquipments({
        type_name: req.body.typename
    });
    if (!metadata) {
        res.send("ไม่มีข้อมูล");
    }
    console.log(metadata);

    metadata.save(metadata).then((data) => {
        res.status(200).send(data);
    }).catch((err) => {
        res.status(500).send({
            msg: err
        });
    });
}

exports.editMetadata = (req, res, next) => {
    const metaId = req.params.id;
    TypeEquipments.findByIdAndUpdate(id, req.body, { useFindAndModify: false }, (err, result) => {
        if (err) {
            console.log(err);
            throw err;
        } else {
            res.status(201).send({
                msg: `Updated data ${result}`,
                data: result
            });
        }
    })
}

exports.deleteMetadata = (req, res, next) => {
    const id = req.params.id;
    TypeEquipments.findByIdAndRemove(id).then(data => {
        res.status(200).send({
            msg: `Remove successful`
        });
    }).catch(err => {
        res.status(500).send({
            msg: `Connot remove this Type name`
        });
    });
}