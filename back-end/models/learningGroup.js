const mongoose = require('mongoose');

const LearningGroupModels = mongoose.Schema({
    learning_group_name: String
}, {
    timestamp: true
});

module.exports = mongoose.model('LearningGroups', LearningGroupModels);