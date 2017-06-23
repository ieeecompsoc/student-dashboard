var path = require('path')
var webpack = require('webpack')

SRC_DIR = path.join(__dirname, 'src')
DES_DIR = path.join(__dirname, 'public')

module.exports = {
	entry: [
		'webpack-hot-middleware/client',
		'webpack/hot/dev-server',
		path.join(SRC_DIR, 'index.jsx')
	],
	devtool: 'source-map',
	target: 'web',
	output: {
		filename: 'bundle.js',
		path: '/',
		publicPath: 'http://localhost:3000/js/'
	},
	cache: true,
	resolve: {
		extensions: ['.jsx', '.js', 'map']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [{
						loader: 'react-hot-loader'
					},{
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
			}
		]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
	    new webpack.NamedModulesPlugin(),
	    new webpack.NoEmitOnErrorsPlugin(),
	    new webpack.DefinePlugin({
	      'process.env.NODE_ENV': JSON.stringify('development'),
	    })
	]
}
