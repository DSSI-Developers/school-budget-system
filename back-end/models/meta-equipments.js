const mongoose = require('mongoose');

const TypeEquipments = mongoose.Schema({
    timestamp: Date,
    type_name: String
});

module.exports = mongoose.model("TypeEquipments", TypeEquipments);