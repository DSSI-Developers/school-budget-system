// Controlller
const TypeEquipments = require('../models/meta-equipments');
/*
    Metadata 
    -> Get metadata
    -> Add metadata
    -> Edit metadata
    -> Delete metadata
*/
exports.getMetadata = (req, res, next) => {
    res.json({
        msg: "Router get metadata worked!"
    });
}

exports.addMetadata = (req, res, next) => {
    res.json({
        msg: "Router add metadata work!"
    });
}

exports.editMetadata = (req, res, next) => {
    res.json({
        msg: "Router edit metadata work!"
    });
}

exports.deleteMetadata = (req, res, next) => {
    res.json({
        msg: "Router delete metadata work!"
    });
}