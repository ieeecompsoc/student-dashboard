const express = require('express');
const route = express.Router();
const path = require('path');
const User = require('../models/user');
const Student = require('../models/student');
const Attendance = require('../models/attendance');
const Notification = require('../models/notification');
const multer = require('multer');
const convertExcel = require('excel-as-json');


route.use(function (req, res, next) {
    User.findOne({enrollment: req.decoded.enrollment, admin: true}, function (err, user) {
        if (err) {
            return res.status(400).json({"success": false, msg: "Some error occurred!"});
        }
        if (!user) {
            return res.status(400).json({"success": false, msg: "No such admin!"});
        }
        next();
    })
});

var uploadAttendance = multer({dest: '../../uploads/private/attendance'});
//req.body = {month, year}
route.post('/upload/attendance', uploadAttendance.single('attendance:' + (new Date()).toLocaleDateString()), function (req, res) {
    if (!req.file) {
        res.status(400).json({"success": false, msg: "file upload error!"});
    }

    //parsing the uploaded excel (.xlsx) file
    let src = 'attendance:' + (new Date()).toLocaleDateString();
    convertExcel(src, null, {omitEmptyFields: true}, function (err, data) {
        if (!data) {
            res.status(400).json({"success": false, msg: "file parsing error!"});
        }

        //saving the parsed data to database
        function sendResponseOnSaveComplete(current, max) {
            if (current === max) {
                res.status(200).json({success: true, msg: "attendance saved to database successfully!"});
            }
        }

        let done = 0;
        for (let i = 0; i < data.length; i++) {
            let user = data[i];
            Attendance.findOne({enrollment: user.enrollment}, function (err, obj) {
                if (err) {
                    res.status(400).json({"success": false, msg: "error saving data to database!"});
                }
                let attendanceMonth = `${req.body.month}-${req.body.year}`;
                obj = {
                    enrollment: user.enrollment,
                }
                obj[attendanceMonth] = user;
                if (obj) {
                    Attendance.findOneAndUpdate({enrollment: user.enrollment}, {$set: obj}, function (err, data) {
                        if (err) {
                            res.status(400).json({"success": false, msg: "error saving data to database!"});
                        }
                        sendResponseOnSaveComplete(++done, data.length);
                    })
                } else {
                    var attendance = new Attendance(obj);
                    attendance.save(function (err) {
                        if (err) {
                            res.status(400).json({"success": false, msg: "error saving data to database!"});
                        }
                        sendResponseOnSaveComplete(++done, data.length);
                    })
                }
            })
        }
    });
});

//req.body = {title, description, stream, batch, section}
route.post('/addNotification', function (req, res) {
    let title = req.body.title, description = req.body.description, stream = req.body.stream, batch = req.body.batch,
        section = req.body.section
    if (!title || !description || !stream || !batch || !section) {
        res.status(400).json({"success": false, msg: "invalid data sent"});
    }

    Notification.findOne().sort('-created_at').exec(function (err, doc) {
        if (err) {
            res.status(400).json({"success": false, msg: "some error occurred!"});
        }

        let notification = new Notification({
            notificationNumber: doc.notificationNumber + 1,
            title: title,
            description: description,
            stream: stream,
            batch: batch,
            section: section
        });
        notification.save(function (err) {
            if (err) {
                res.status(400).json({"success": false, msg: "error in saving notification!"});
            }
            res.status(200).json({"success": true, msg: "notification saved successfully!"});
        })
    })
});


module.exports = route;