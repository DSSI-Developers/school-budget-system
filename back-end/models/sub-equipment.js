const mongoose = require('mongoose');

const subEquipments = mongoose.Schema({
    mainId: { type: mongoose.Schema.Types.ObjectId, ref: "MainEquipment", require: true },
    mainName: { type: String },
    equipmentName: String,
    budgetPerPrice: String,
    unit: Number,
    budget: Number,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true }
});

module.exports = mongoose.model('SubEquipments', subEquipments);