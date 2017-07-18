const Student = require('../models/student');
const Result = require('../models/result');

let getResults = function (req, res) {
    if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
    let ern = req.decoded.enrollment;
    Student.findOne({"enrollment": ern}, "_id", function (err, stud) {
        if (err) return res.status(400).json({success: false, msg: "Some error occurred!"});
        else {
            if (!stud) return res.status(400).json({success: false, msg: "Unauthorized Access"});
            Result.find({"student_id": stud._id}, function (err, results) {
                if (err) res.status(500).json({success: false, msg: "Something Crashed"});
                else {
                    if (results.length === 0) res.status(200).json({success: false, msg: "No result to return."});
                    else {
                        res.status(200).json(results);
                    }
                }
            });
        }
    });
};

module.exports = getResults;