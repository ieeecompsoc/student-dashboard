var jwt = require('jsonwebtoken');

var User = require('../models/user');
var Student = require('../models/student');

var authenticate = function (req, res) {
    if(req.body.admin && (req.body.enrollment === "admin")){
        req.body.enrollment = 11100011100;
    }
    User.findOne({"enrollment": req.body.enrollment, admin: !!req.body.admin}, function (err, user) {
        if (err) return res.status(500).json({"success": false, msg: "Something Crashed"});
        else {
            if (!user) return res.status(400).json({"success": false, msg: "Authentication failed"});
            else {
                user.comparePassword(req.body.password, function (err, isMatch) {
                    if (err) return res.status(400).json({"success": false, msg: "Authentication failed"});
                    else {
                        if (!isMatch) return res.status(400).json({"success": false, msg: "Authentication failed"});
                        if(!!req.body.admin) {
                            var token = jwt.sign({enrollment: user.enrollment}, process.env.TOKEN_KEY, {
                                expiresIn: 60 * 60 * 24 * 7
                            });
                            return res.status(200).json({
                                success: true,
                                msg: "Authenticated. Token valid till 7 days",
                                token: token
                            });
                        }
                        Student.findOne({"enrollment": req.body.enrollment}, "enrollment", function (err, student) {
                            if (err) return res.status(500).json({"success": false, msg: "Something Crashed"});
                            else {
                                if (!student) return res.status(400).json({"success": false, msg: "Student not found"});
                                else {
                                    console.log(student);
                                    var token = jwt.sign(student, process.env.TOKEN_KEY, {
                                        expiresIn: 60 * 60 * 24 * 7
                                    });
                                    return res.status(200).json({
                                        success: true,
                                        msg: "Authenticated. Token valid till 7 days",
                                        token: token
                                    });
                                }
                            }
                        });
                    }
                })
            }
        }
    });
};

module.exports = authenticate;
