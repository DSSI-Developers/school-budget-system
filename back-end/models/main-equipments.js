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
    dateProject: { type: Date },
    condition: { type: String },
    status: { type: String },
    approveCondition: { type: String },
    approveReason: { type: String },
    userId: { type: String },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true }
}, { timestamp: true });

module.exports = mongoose.model("MainEquipment", mainEquipments);