const mongoose = require('mongoose');
const timestamps = require('mongoose-timestamp')
const bcrypt = require('bcrypt')
const UsersSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    password: { type: String },
    // confirm_password: { type: String },
    phone: { type: String },
    position: { type: String },
    department: { type: String },
    role: {
        type: String,
        default: 'USER',
        enum: ["ADMIN", "LEADER", "USER"]
    },
    avatar: { type: String },
    permission: { type: String },
    verified: {
        type: Boolean,
        default: false,
    },
    verifiedAt: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
}, { timestamps: true });

const Users = module.exports = mongoose.model('Users', UsersSchema);

module.exports.getUserById = (id, callback) => {
    Users.findById(id, callback);
}

module.exports.getUserByUsername = (email, callback) => {
    const query = { email: email }
    Users.findOne(query, callback);
}

module.exports.addUser = (newUser, callback) => {
    bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.comparePassword = (candidatePassword, hash, callback) => {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err;
        callback(null, isMatch);
    });
}