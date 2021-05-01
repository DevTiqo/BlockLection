const mongoose = require("mongoose");


const candidate = mongoose.model('candidate', {
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    aboutYou: {
        type: String,
        required: true,
        min: 1,
        max: 555,
    },
    profileImg: {
        type: String
    },
     election_id: {
        type: Number,
        required: true,
        default:0
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
      studentStatus: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
      department: {
        type: String,
        required: true,
        min: 6,
        max: 1024,
    },
    imageUrl: {
        type: String,
        default: "",
    },
    date: {
        type: Date,
        default: Date.now,
    },
    adminVerified: {
        type: Boolean,
        default: false
    }
});

module.exports = candidate;