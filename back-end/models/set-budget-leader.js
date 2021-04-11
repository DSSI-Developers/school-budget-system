const mongoose = require('mongoose');

const setBudget = mongoose.Schema({
    budget: Number,
    learningGroup: String,
    date: Date,
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true }
});

module.exports = mongoose.model('SetBudget', setBudget);