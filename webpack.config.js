var path = require('path')

SRC_DIR = path.join(__dirname, 'src')
DES_DIR = path.join(__dirname, 'public')

module.exports = {
	entry: path.join(SRC_DIR, 'index.jsx'),
	output: {
		filename: 'bundle.js',
		path: path.join(DES_DIR, 'js')
	},
	cache: true,
	resolve: {
		extensions: ['.js', '.jsx', 'map']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								'es2015',
								'stage-2',
								'react'
							]
						}
				}]
			},{
        test: /\.css$/,
        use: [{
					loader: 'style-loader'
				},{
					loader: 'css-loader',
					options: {
						modules: true
					}
				}]
			},{
				test: /\.json?$/,
				loader: 'json'
			},{
				test: /\.svg$/, loader: 'svg-loader?pngScale=2'
			}
		]
	}
}
