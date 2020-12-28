const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp')

const subEquipments = mongoose.Schema({
    equipmentName: String,
    budgetPerPrice: String,
    unit: Number,
    budget: Number,
}, { timestamps: true });

module.exports = mongoose.model('SubEquipment', subEquipments);