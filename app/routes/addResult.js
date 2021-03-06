const Student = require('../models/student');
const Result = require('../models/result');

let addResult = function (req, res) {
    if (!req.body.enrollment || !req.body.semester || !req.body.subjects || req.body.enrollment.length !== 11)
        return res.status(400).json({success: false, msg: "Invalid Data."});
    else {
        Student.findOne({"enrollment": req.body.enrollment}, "_id", function (err, stud) {
            if (err) return res.status(400).json({success: false, msg: "Some error occurred."});
            if (!stud) return res.status(400).json({success: false, msg: "Invalid enrollment."});

            let result = new Result({
                student_id: stud._id,
                semester: req.body.semester,
                subjects: req.body.subjects
            });
            result.save(function (err) {
                if (err) {
                    return res.status(500).json({success: false, msg: "Unable to save result."});
                } else {
                    res.status(200).json({success: true, msg: "Result has been saved."});
                }
            });
        });
    }
};

module.exports = addResult;
