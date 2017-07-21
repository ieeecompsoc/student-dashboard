const nodemailer = require('nodemailer');
const Student = require('./../models/student');

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

let editInfo = function (req, res) {
    if (req.decoded === false) return res.status(400).json({success: false, msg: "Unauthorized Access"});
    if (!req.body.changes) return res.status(400).json({success: false, msg: "error! Changes not received!"});
    let ern = req.decoded.enrollment;
    Student.findOne({"enrollment": ern}, "_id", function (err, stud) {
        if (err) return res.status(400).json({success: false, msg: "Some error occurred!"});
        else {
            if (!stud) return res.status(400).json({success: false, msg: "Unauthorized Access"});

            // setup email data with unicode symbols
            let mailOptions = {
                from: `"admin" <${process.env.EMAIL}>`, // sender address
                to: process.env.HEAD_EMAIL, // list of receivers
                subject: 'msit student dashboard student\'s info change request', // Subject line
                html: `<h4>enrollment: ${ern}</h4><h2>changes: ${JSON.stringify(req.body.changes)}</h2>`
            };

            // send mail with defined transport object
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.log(error);
                    return res.status(400).json({success: false, msg: "Error submitting request"});
                }
                console.log('Message %s sent: %s', info.messageId, info.response);
                res.status(200).json({success: true, msg: "info change request submitted"});
            });
        }
    });
};

module.exports = editInfo;
