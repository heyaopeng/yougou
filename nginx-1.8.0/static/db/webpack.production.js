// process.env.NODE_ENV = 'production'
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: './js/app.js',
	output: {
		path: path.join(__dirname, '__build__'),
		filename: '[hash].bundle.js',
		chunkFilename: '[id].[hash].bundle.js',
		publicPath: '/__build__/'
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract('style-loader', 'css-loader', {
				publicPath: './'
			})
		}, {
			test: /\.less$/,
			loader: 'style-loader!css-loader!less-loader'
		}, {
			test: /\.(ttf|eot|svg|woff(2)?)(\?v=[\d.]+)?(\?[a-z0-9#-]+)?$/,
			loader: 'file-loader'
		}, {
			test: /\.(png|jpg|gif)$/,
			loader: 'url-loader?limit=8192'
		}, {
			test: /\.jsx?$/,
			exclude: /(node_modules|bower_components)/,
			loader: 'babel',
			query: {
				presets: ['react', 'es2015']
			}
		}]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env':{
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin('[hash].bundle.css'),
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new HtmlWebpackPlugin({
			inject: true,
			version: new Date().getTime(),
			template: 'index.ejs',
			filename: '../index.html'
		})
	]
};
