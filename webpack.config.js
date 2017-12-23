
const CleanWebpackPlugin = require('clean-webpack-plugin');

const path = require('path');
const www = path.resolve(__dirname, 'www');
const build = "build";

module.exports = {
	entry: www + '/app.js',
	output: {
		path: www,
		filename: `${build}/bundle.js`
	},
	plugins: [
		new CleanWebpackPlugin([ build ])
	],
	module: {
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				loader: `file-loader?name=${build}/[name]-[hash].[ext]`
			}
		]
	}
};
