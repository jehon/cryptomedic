/* eslint-env node */

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');

const www = path.resolve(__dirname, 'www');
const build = 'build';
const released_version = (new Date()).toISOString();

// fse.emptyDirSync(__dirname + '/www/build');
fs.writeFileSync(__dirname + '/www/release_version.txt', released_version);
fs.writeFileSync(__dirname + '/www/release_version.js', `window.application_version = '${released_version}';`);
fse.copy(__dirname + '/conf/refs/build.htaccess', __dirname + '/www/build/.htaccess');

module.exports = {
	// TODO: use $myconfig["debug"]
	mode: 'production',
	entry: {
		app: www + '/app.js',
	},
	output: {
		path: `${www}/${build}`,
		filename: '[name]-[chunkhash].js'
	},
	plugins: [
		new CleanWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: www + '/static/index-original.html',
			filename: www + '/static/index.html',
			inject: false
		}),
		new webpack.HashedModuleIdsPlugin()
	],
	module: {
		rules: [
			{ test: /\.css$/, loader: 'style-loader!css-loader' },
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: 'file-loader?name=[name]-[hash].[ext]'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					plugins: [
						[ '@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true } ],
						'@babel/plugin-proposal-optional-chaining',
						'@babel/plugin-proposal-nullish-coalescing-operator',
						'@babel/plugin-proposal-class-properties'
					]
				}
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
		},
	},
};
