const mongoose = require('mongoose');


const subEquipmentList = mongoose.Schema({
    titleMainList: { type: String },
    idMainList: { type: String },
    listData: []
});

module.exports = mongoose.model('SubEquipmentList', subEquipmentList);