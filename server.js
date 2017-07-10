const path = require('path'),
    express = require('express'),
    app = express(),
    webpackDevHelper = require('./index.dev.js')
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');


if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...')
    webpackDevHelper.useWebpackMiddleware(app)
} else {
    console.log('PRODUCTION ENVIRONMENT')
    app.use('/js', express.static(__dirname + '/public/js'))
}


var apiRoutes = require('./app/apiRoutes');
dotenv.load();
var port = process.env.PORT || 8000;
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});

require('dotenv').config();
if (process.env.NODE_ENV === 'DEVELOPMENT')
    app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Routes for the Api
app.get('/', function (req, res) {
    res.send('Hello! The Api is listening at  http://localhost:' + port + '/api');
});
app.use('/api', apiRoutes);

// Setting up express to serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'uploads')));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    next(err);
    err.status = 404;
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

// we always want to serve the index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(port);

module.exports = app;