const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var notification = new Schema({
    notificationNumber: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    stream: {
        type: String,
        required: true
    },
    batch: {
        type: Number,
        required: true
    },
    section: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
    },
});

notification.pre('save', function (next) {
    var notification = this;
    notification.created_at = new Date();
    next();
});

module.exports = mongoose.model('notification', notification);