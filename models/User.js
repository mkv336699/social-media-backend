const mongoose = require("mongoose");
const app = require('../app');

const UserSchema = new mongoose.Schema({
    name: { type: String, default: '' },
    dateOfBirth: { type: String, default: '' },
    username: { type: String, default: '', unique: true, sparse: true },
    password: { type: String }
}, { timestamps: { createdAt: 'createdAt' } });

const User = app.db.model('User', UserSchema);
module.exports = User;
