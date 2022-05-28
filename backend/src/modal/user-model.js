const mongoose = require('mongoose');

const userShema = new mongoose.Schema({
    fullName: {
        type: String,
    },
    email: {
        type: String,
    },
    mobileNo: {
        type: Number,
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const userModel = new mongoose.model("User", userShema);

module.exports = userModel;