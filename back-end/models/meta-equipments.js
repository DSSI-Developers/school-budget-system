const mongoose = require('mongoose');

const TypeEquipments = mongoose.Schema({
    type_name: String
}, { timpstamp: true });

module.exports = mongoose.model("TypeEquipments", TypeEquipments);