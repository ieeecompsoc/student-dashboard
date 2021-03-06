var bcrypt = require('bcrypt');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var SALT_WORK_FACTOR = parseInt(process.env.SALT_WORK_FACTOR);

var User = new Schema({
    enrollment: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    reset_token: {
        type: String
    },
    admin: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: Date
    },
    updated_at: {
        type: Date
    }
});

User.pre('save', function (next) {
    var user = this;
    now = new Date();
    user.updated_at = now;
    if (!user.created_at) {
        user.created_at = now;
    }
    if (!user.isModified('password')) return next();
    hashPassword(user.password, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});

User.pre('findOneAndUpdate', function (next) {
    this.findOneAndUpdate({}, {$set: {updated_at: new Date()}});
    next();
});

User.methods.comparePassword = function (candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

User.statics.hashPassword = function (password, cb) {
    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return cb(err);
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) return cb(err);
            cb(null, hash);
        });
    });
};

module.exports = mongoose.model('User', User);
