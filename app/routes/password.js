/**
 * Created by hackbansu on 15/7/17.
 */
const express = require('express');
const router = express.Router();
const assert = require('assert');
const path = require('path');
const User = require('../models/user');
const Student = require('../models/student');
const nodemailer = require('nodemailer');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR;


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: process.env.E_HOST,
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: process.env.EMAIL,
        pass: process.env.E_PASSWORD,
    }
});

//some functions to generate a random string for password reset
let randomChar = () => String.fromCharCode(Math.floor(Math.random() * 26) + 65);
function str(i) {
    if (i === 0) return "";
    return str(i - 1) + randomChar();
}
let num = (k) => Math.ceil(Math.random() * k);
function getID() {
    let retval = str(1 + Math.floor(Math.random() * 4)) + num(84916394) + str(3 + Math.floor(Math.random() * 3)) + num(634894) + str(3 + Math.floor(Math.random() * 3));
    return retval;
}


router.get('/forgot', function (req, res) {
    if (!req.query.enrollment) {
        return res.status(400).json({success: false, msg: "Please submit your enrollment number"});
    }
    let enrollment = req.query.enrollment;
    if (enrollment.length !== 11) {
        return res.status(400).json({success: false, msg: "Invalid Credentials."});
    }

    const reset_token = getID();
    User.findOneAndUpdate({"enrollment": enrollment}, {reset_token: reset_token}, function (err, doc) {
        if (err) {
            return res.status(400).json({success: false, msg: "Invalid Credentials."});
        }

        // setup email data with unicode symbols
        let mailOptions = {
            from: `"admin" <${process.env.EMAIL}>`, // sender address
            to: doc.email, // list of receivers
            subject: 'msit student dashboard password reset', // Subject line
            html: {path: `http://localhost:${process.env.PORT || 4000}/api/v1/password/mailPage?enrollment=${enrollment}&reset_token=${reset_token}`,}
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(400).json({success: false, msg: "Error sending mail"});
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.status(200).json({success: true, msg: "Password reset link sent on e-mail"});
        });
    });
})

router.get('/mailPage', function (req, res) {
    let enrollment = req.query.enrollment;
    let reset_token = req.query.reset_token;
    if (!enrollment || !reset_token || enrollment.length !== 11)
        return res.status(400).send('invalid request');

    let linkToReset = `http://${process.env.DOMAIN}/#/reset/${enrollment}/${reset_token}`;
    res.render('index', {linkToReset: linkToReset, domain: process.env.DOMAIN})
})

router.post('/checkResetToken', function (req, res) {
    if (!req.body.enrollment || !req.body.reset_token || req.body.enrollment.length !== 11)
        return res.status(400).json({success: false, msg: "Invalid"});
    User.findOne({
        "enrollment": req.body.enrollment,
        "reset_token": req.body.reset_token,
    }, function (err, doc) {
        if (err || !doc) {
            return res.status(400).json({success: false, msg: "Invalid Credentials."});
        }
        res.status(200).json({success: true, msg: "valid token"});
    });
})

router.post('/reset', function (req, res) {
    if (!req.body.enrollment || !req.body.reset_token || !req.body.password)
        return res.status(400).json({success: false, msg: "Invalid request"});
    let enrollment = req.body.enrollment, reset_token = req.body.reset_token, password = req.body.password;
    if (enrollment.length !== 11 || password.length < 8) {
        return res.status(400).json({success: false, msg: "Invalid request"});
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) {
            return res.status(400).json({success: false, msg: "Unable to update password"});
        }
        bcrypt.hash(password, salt, function (err, hash) {
            if (err) {
                return res.status(400).json({success: false, msg: "Unable to update password"});
            }
            password = hash;
            User.findOneAndUpdate({
                    "enrollment": req.body.enrollment,
                    "reset_token": req.body.reset_token
                }, {
                    password: password,
                    reset_token: undefined,
                },
                function (err, users) {
                    if (err) {
                        return res.status(400).json({success: false, msg: "Invalid Credentials."});
                    }

                    res.status(200).json({success: true, msg: "password reset successful"});
                });
        });
    });
})


module.exports = router;