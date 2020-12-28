const mongoose = require('mongoose');

const LearningGroupModels = mongoose.Schema({
    timestamp: Date,
    learning_group_name: String
});

module.exports = mongoose.model('LearningGroups', LearningGroupModels);