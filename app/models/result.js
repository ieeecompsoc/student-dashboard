const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var result = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    created_at: {
        type: Date,
    },
    subjects: {
        type: Schema.Types.Mixed,
        required: true
    }

});

result.pre('save', function (next) {
    var user = this;
    user.created_at = new Date();
    next();
});

module.exports = mongoose.model('result', result);