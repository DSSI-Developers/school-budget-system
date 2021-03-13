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
    userId: {
        type: String
    },
    readStatus: {
        type: Boolean,
        default: false
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "Users", require: true }
});


module.exports = mongoose.model("Notification", notification);