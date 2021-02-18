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
        maxLength: 200
    },
    note: {
        type: String
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true }
});


module.exports = mongoose.model("Notification", notification);