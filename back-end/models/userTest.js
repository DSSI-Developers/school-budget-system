const mongoose = require('mongoose');


const usersTest = mongoose.Schema({
    name: String,
    email: {
        type: String
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('UserTest', usersTest);