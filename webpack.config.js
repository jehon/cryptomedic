/* eslint-env node */

const HtmlWebpackPlugin = require('html-webpack-plugin');

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const www = path.resolve(__dirname, 'www');
const build = 'build';

const released_version = (new Date()).toISOString();

fse.emptyDirSync(__dirname + '/www/build');
fs.writeFileSync(__dirname + '/www/release_version.txt', released_version);
fse.copy(__dirname + '/refs/build.htaccess', __dirname + '/www/build/.htaccess');

module.exports = {
	entry: { 
		app: www + '/app.js',
	},
	output: {
		path: www,
		filename: `${build}/[name]-[hash].js`
	},
	plugins: [
		new webpack.DefinePlugin({
			APPLICATION_BUILD_TIME: '\'' + released_version + '\''
		}),
		new HtmlWebpackPlugin({
			template: www + '/static/index-original.html',
			filename: www + '/static/index.html',
			inject: false
		})
	],
	module: {
		loaders: [
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: `file-loader?name=${build}/[name]-[hash].[ext]`
			}
		]
	}
};
