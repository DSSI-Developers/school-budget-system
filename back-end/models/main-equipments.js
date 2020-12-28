const mongoose = require("mongoose");

const mainEquipments = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    position: { type: String },
    learningGroup: { type: String },
    subjectTeach: { type: String },
    reason: { type: String },
    objective: { type: String },
    typeEquipments: { type: String },
    learningGroups: { type: String },
    majorList: { type: String },
    budget: { type: Number, },
    necessary: { type: Number },
    existEquipment: { type: Number },
    otherReason: { type: String },
    // dateProject: { type: Date },
    condition: { type: String },
    status: { type: String }
    // dataTime: {
    //     type: Date,
    //     default: Date.now,
    // },
});

module.exports = mongoose.model("MainEquipment", mainEquipments);