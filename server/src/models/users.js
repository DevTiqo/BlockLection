const mongoose = require("mongoose");


const user = mongoose.model('user', {
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    matnum: {
        type: String,
        required: true,
        min: 6,
        max: 30,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    profileImg: {
        type: String
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    faculty: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    department: {
        type: String,
        required: true,
        min: 6,
        max: 100,
    },
    studentStatus: {
        type: String,
        required: true,
        min: 6,
        max: 100,
    },
    imageUrl: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    rfidRegistered: {
        type: Boolean,
        default: false
    }
});

module.exports = user;