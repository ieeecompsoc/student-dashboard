var express = require('express');
var jwt = require('jsonwebtoken');

const routes = {
    addUser: require('./routes/addUser'),
    getUsers: require('./routes/getUsers'),
    authenticate: require('./routes/authenticate'),
    password: require('./routes/password'),
}

var router = express.Router();

router.use(function (req, res, next) {
    try {
        req.body = JSON.parse(Object.keys(req.body)[0]);
    } catch (err) {
        req.body = req.body;
    }
    next();
});

router.use('/password', routes.password);

router.use(/\/((?!(addUser)|(authenticate)).)*/, function (req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'] || null;
    if (token) {
        jwt.verify(token, process.env.TOKEN_KEY, function (err, decoded) {
            if (err) req.decoded = false;
            else req.decoded = decoded._doc;
            next();
        })
    }
    else {
        res.status(400).json({success: false, msg: "Unauthorized Access"});
    }
});


router.post('/authenticate', routes.authenticate);
router.post('/addUser', routes.addUser);
router.get('/getUsers', routes.getUsers);


module.exports = router;
