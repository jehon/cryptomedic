
const CleanWebpackPlugin = require('clean-webpack-plugin');

const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const fse = require('fs-extra');
const www = path.resolve(__dirname, 'www');
const build = 'build';

const released_version = (new Date()).toISOString();

fs.writeFileSync(__dirname + '/www/release_version.txt', released_version);
fse.copySync(__dirname + '/node_modules/bootstrap/dist/', __dirname + '/www/build/bootstrap');

module.exports = {
	entry: { 
		app: www + '/app.js',
	},
	output: {
		path: www,
		filename: `${build}/[name].js`
	},
	plugins: [
		new CleanWebpackPlugin([ build ]),
  		new webpack.DefinePlugin({
    		APPLICATION_BUILD_TIME: '\'' + released_version + '\''
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
