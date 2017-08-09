var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Attendance = new Schema({
    enrollment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Attendance', Attendance);
