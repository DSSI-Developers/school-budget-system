const mongoose = require('mongoose');

const notification = mongoose.Schema({
    dateTime: {
        type: Date,
        default: Date.now(),
    },
    type: {
        type: String
    },
    status: {
        type: String
    },
    detail: {
        type: String,
        minLength: 5,
        maxLength: 200
    },
    note: {
        type: String
    }
});


module.exports = mongoose.model("Notification", notification);