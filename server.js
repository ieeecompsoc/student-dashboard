const path = require('path'),
    express = require('express'),
    app = express(),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    dotenv = require('dotenv'),
    mongoose = require('mongoose')

require('dotenv').config();
dotenv.load();
var port = process.env.PORT || 4000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views/resetPassword"));

var apiRoutes = require('./app/apiRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE_URL, {useMongoClient: true});

if (process.env.NODE_ENV !== 'production') {
    const webpackDevHelper = require('./index.dev.js')
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...')
    app.use(logger('dev'));
    webpackDevHelper.useWebpackMiddleware(app)
} else {
    console.log('PRODUCTION ENVIRONMENT')
    app.use('/js', express.static(__dirname + '/dist/js'))
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Setting up express to serve static files

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'views')));

// we always want to serve the index.hbs
app.get('/', (req, res) => {
    if (process.env.NODE_ENV !== 'production') {
        res.sendFile(path.join(__dirname, 'assets/index.hbs'))
    } else {
        res.sendFile(path.join(__dirname, 'dist/index.hbs'))
    }
})

// Routes for the Api
app.get('/api', function (req, res) {
    res.send('Hello! The Api Server is listening at  http://localhost:' + port + '/api/v1');
});
app.use('/api/v1', apiRoutes);

app.listen(port, function () {
    console.log('Server running at http://localhost:' + port);
})
