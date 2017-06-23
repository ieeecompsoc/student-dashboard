var path = require('path'),
    express = require('express'),
		app = express(),
		webpackDevHelper = require('./index.dev.js')


if (process.env.NODE_ENV !== 'production') {
    console.log('DEVOLOPMENT ENVIRONMENT: Turning on WebPack Middleware...')
    webpackDevHelper.useWebpackMiddleware(app)
} else {
    console.log('PRODUCTION ENVIRONMENT')
    app.use('/js', express.static(__dirname + '/public/js'))
}

// Setting up express to serve static files
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'node_modules')))

// we always want to serve the index.html
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public/index.html'))
})

app.listen(3000)
